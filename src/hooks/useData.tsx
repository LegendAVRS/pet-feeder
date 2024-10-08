import { useCallback, useEffect, useState } from "react";
import { TIME_FETCH_INTERVAL, URL_HEADER } from "../utils/global";

const useData = <T,>(
    endpoint: string,
    timeRange?: { startDate: number | undefined; endDate: number | undefined }
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchWithTimeout = async (
        url: string,
        options: RequestInit = {},
        timeout: number = 3000
    ) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        options.signal = controller.signal;
        options.mode = "cors";

        try {
            const response = await fetch(url, options);
            clearTimeout(id);
            return response;
        } catch (error) {
            if (controller.signal.aborted) {
                setError("Request timed out");
                throw new Error("Request timed out");
            }
            throw error;
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const url = URL_HEADER + endpoint;
            let response;
            if (!timeRange) {
                response = await fetchWithTimeout(url);
            } else {
                response = await fetchWithTimeout(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(timeRange),
                });
            }

            if (!response!.ok) {
                setError("Failed to fetch data");
                throw new Error("Failed to fetch data");
            }

            const jsonData = await response!.json();
            setData(jsonData as T);
        } catch (err) {
            // @ts-expect-error: err might not have a message property
            setError(err.message);
        }
    }, [timeRange, endpoint]);

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, TIME_FETCH_INTERVAL);

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, setData, error, refreshData: fetchData };
};

export default useData;
