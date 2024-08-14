import { useEffect, useState, useCallback } from "react";
import { TIME_FETCH_INTERVAL, URL_HEADER } from "../utils/types";

const useData = <T,>(
    endpoint: string,
    timeRange?: { start: Date | null; end: Date | null }
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            if (!timeRange) {
                const response = await fetch(URL_HEADER + endpoint);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setData(jsonData as T);
                return;
            }

            const response = await fetch(URL_HEADER + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timeRange),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            setData(jsonData as T);
        } catch (err: any) {
            setError(err.message);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, TIME_FETCH_INTERVAL);

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, [fetchData]);

    return { data, setData, error, refreshData: fetchData };
};

export default useData;
