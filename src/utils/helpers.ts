import { ChartData, ChartOptions } from "chart.js";
import { FeedData, ImageData } from "./types";

export const getLastValue = <T>(arr: Array<T>): T => {
    return arr[arr.length - 1];
};

const emptyFeedData: FeedData = {
    value: 0,
    time: 0,
    isOn: false,
};
export const getNextFeed = (schedule: Array<FeedData>) => {
    const now = new Date();
    const currentTimeInUnix = Math.floor(now.getTime() / 1000);
    console.log(currentTimeInUnix, schedule);
    for (let i = 0; i < schedule.length; ++i) {
        if (schedule[i].time >= currentTimeInUnix) {
            return schedule[i];
        }
    }
    return emptyFeedData;
};

export const getPrevFeed = (schedule: Array<FeedData>) => {
    const now = new Date();
    const currentTimeInUnix = Math.floor(now.getTime() / 1000);
    for (let i = 1; i < schedule.length; ++i) {
        if (schedule[i].time >= currentTimeInUnix) {
            return schedule[i - 1];
        }
    }
    return emptyFeedData;
};

export const getImagesInGroup = (imagesData: Array<ImageData>) => {
    let imagesInGroup: { [key: string]: ImageData[] } = {};

    imagesData.forEach((image) => {
        let capturedDate = new Date(image.capturedTime * 1000);
        let dateKey = capturedDate.toISOString().split("T")[0]; // Get date part in YYYY-MM-DD format

        if (!imagesInGroup[dateKey]) {
            imagesInGroup[dateKey] = [] as ImageData[];
        }

        imagesInGroup[dateKey].push(image);
    });

    return imagesInGroup;
};

type PieChartReturn = {
    pieChartData: ChartData<"pie">;
    pieChartOption: ChartOptions<"pie">;
};

export const getPieChart = (label: string, data: number[]): PieChartReturn => {
    const pieChartData = {
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor: ["rgb(255,10,10)", "#c4c4c4"],
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
    start: Date | null,
    end: Date | null,
    data: { value: number; time: number }[]
): ChartData<"line"> => {
    const filteredData = filterDataByDateRange(data, start, end);
    return {
        labels: filteredData.map((entry) =>
            new Date(entry.time).toLocaleDateString()
        ),
        datasets: [
            {
                label: "Value",
                data: filteredData.map((entry) => entry.value),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
            },
        ],
    };
};
