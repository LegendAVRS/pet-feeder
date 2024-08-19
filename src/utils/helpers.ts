import { ChartData, ChartOptions } from "chart.js";
import { ImagesData, VideosData } from "./types";
import { URL_HEADER } from "./global";

export const getLastValue = <T>(arr: Array<T>): T => {
    return arr[arr.length - 1];
};

export type GalleryItem = {
    url: string;
    isVideo: boolean;
};

export const getImagesInGroup = (
    imagesData: ImagesData,
    videoData: VideosData
) => {
    let galleryDataInGroup: { [key: string]: GalleryItem[] } = {};

    if (!imagesData.images || !videoData.videos) {
        return galleryDataInGroup;
    }

    imagesData.images.forEach((image) => {
        const capturedDate = new Date(image.time * 1000);
        const dateKey = capturedDate.toISOString().split("T")[0]; // Get date part in YYYY-MM-DD format

        if (!galleryDataInGroup[dateKey]) {
            galleryDataInGroup[dateKey] = [] as GalleryItem[];
        }

        galleryDataInGroup[dateKey].push({ url: image.url, isVideo: false });
    });

    videoData.videos.forEach((video) => {
        const capturedDate = new Date(video.time * 1000);
        const dateKey = capturedDate.toISOString().split("T")[0]; // Get date part in YYYY-MM-DD format

        if (!galleryDataInGroup[dateKey]) {
            galleryDataInGroup[dateKey] = [] as GalleryItem[];
        }

        galleryDataInGroup[dateKey].push({ url: video.url, isVideo: true });
    });

    return galleryDataInGroup;
};

type PieChartReturn = {
    pieChartData: ChartData<"pie">;
    pieChartOption: ChartOptions<"pie">;
};

export const getPieChart = (
    label: string,
    data: number[],
    warningThresHold: number,
    isGreater = true
): PieChartReturn => {
    const value = data[0];

    let backgroundColors = ["rgb(1,100,52)", "#c4c4c4"];

    if (isGreater) {
        if (value > warningThresHold) {
            backgroundColors = ["rgb(255,10,10)", "#c4c4c4"];
        }
    } else {
        if (value < warningThresHold) {
            backgroundColors = ["rgb(255,10,10)", "#c4c4c4"];
        }
    }

    const pieChartData = {
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor: backgroundColors,
                hoverOffset: 4,
            },
        ],
    };

    const pieChartOption: ChartOptions<"pie"> = {
        cutout: "60%",
        rotation: -120,
        circumference: 240,
        aspectRatio: 1,
        plugins: {
            title: {
                display: true,
                position: "bottom", // explicitly typed as a string literal
                text: label,
            },
        },
    };

    return { pieChartData: pieChartData, pieChartOption: pieChartOption };
};

export const filterDataByDateRange = (
    data: { value: number; time: number }[],
    start: Date | null,
    end: Date | null
) => {
    if (!start || !end) return data;
    const startTime = start.getTime();
    const endTime = end.getTime();
    return data.filter(
        (entry) => entry.time >= startTime && entry.time <= endTime
    );
};

export const getLineChart = (
    data: { value: number; time: number }[],
    label: string,
    max: number = 100
): { chartData: ChartData<"line">; options: ChartOptions<"line"> } => {
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: max,
                title: {
                    display: true,
                    text: label,
                    color: "black",
                },
            },
        },
    };

    if (!data || data.length === 0) {
        const chartData: ChartData<"line"> = {
            labels: [],
            datasets: [
                {
                    label: label,
                    data: [],
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    tension: 0.1,
                },
            ],
        };
        return { chartData, options };
    }

    const chartData: ChartData<"line"> = {
        labels: data.map((entry) =>
            new Date(entry.time * 1000).toLocaleDateString()
        ),
        datasets: [
            {
                label: label,
                data: data.map((entry) => entry.value),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
            },
        ],
    };
    return { chartData, options };
};

export const unixToDateTimeString = (unix: number) => {
    const date = new Date(unix * 1000);
    return date.toLocaleString();
};

export function minutesToTimeString(timestamp: number) {
    // Calculate the hours and minutes
    const hours = Math.floor(timestamp / 60);
    const mins = timestamp % 60;

    // Determine AM or PM suffix
    const period = hours >= 12 ? "PM" : "AM";

    // Adjust hours for 12-hour format
    const adjustedHours = hours % 12 || 12;

    // Format hours and minutes as strings with leading zeros if necessary
    const formattedHours = String(adjustedHours).padStart(2, "0");
    const formattedMinutes = String(mins).padStart(2, "0");

    // Combine to form the time string
    return `${formattedHours}:${formattedMinutes} ${period}`;
}

export function getTimeString(str: string) {
    const hours = str[0] + str[1];
    const mins = str[2] + str[3];
    return `${hours}:${mins}`;
}

export const getData = async (endpoint: string) => {
    const res = await fetch(URL_HEADER + endpoint, { mode: "cors" });
    const data = await res.json();
    return data;
};

export const postRequest = async (data: any, endpoint: string) => {
    const endpoint_url = URL_HEADER + endpoint;

    try {
        const response = await fetch(endpoint_url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText
            );
        }

        const responseData = await response.json();
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteRequest = async (endpoint: string) => {
    const endpoint_url = URL_HEADER + endpoint;

    try {
        const response = await fetch(endpoint_url, {
            method: "DELETE",
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText
            );
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
