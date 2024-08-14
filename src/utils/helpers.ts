import { ChartData, ChartOptions } from "chart.js";
import { ImageData, URL_HEADER } from "./types";

export const getLastValue = <T>(arr: Array<T>): T => {
    return arr[arr.length - 1];
};


export const getImagesInGroup = (imagesData: Array<ImageData>) => {
    let imagesInGroup: { [key: string]: ImageData[] } = {};

    imagesData.forEach((image) => {
        let capturedDate = new Date(image.time * 1000);
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

export const getPieChart = (label: string, data: number[], warningThresHold: number, isGreater = true): PieChartReturn => {
    let value = data[0];
    
    let backgroundColors = ["rgb(1,100,52)", "#c4c4c4"]

    if (isGreater) {
        if (value > warningThresHold) {
            backgroundColors = ["rgb(255,10,10)", "#c4c4c4"];
        }
    }
    else {
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
    start: Date | null,
    end: Date | null,
    data: { value: number; time: number }[],
    label: string,
    max: number = 100
): { chartData: ChartData<"line">; options: ChartOptions<"line"> } => {
    const filteredData = filterDataByDateRange(data, start, end);
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
    const chartData: ChartData<"line"> = {
        labels: filteredData.map((entry) =>
            new Date(entry.time).toLocaleDateString()
        ),
        datasets: [
            {
                label: label ,
                data: filteredData.map((entry) => entry.value),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
            },
        ],
    }
    return { chartData, options };
};

export const unixToDateTimeString = (unix: number) => {
    const date = new Date(unix * 1000);
    return date.toLocaleString();
}

export function minutesToTimeString(timestamp: number) {
  // Calculate the hours and minutes
  const hours = Math.floor(timestamp / 60);
  const mins = timestamp % 60;

  // Determine AM or PM suffix
  const period = hours >= 12 ? 'PM' : 'AM';

  // Adjust hours for 12-hour format
  const adjustedHours = hours % 12 || 12;

  // Format hours and minutes as strings with leading zeros if necessary
  const formattedHours = String(adjustedHours).padStart(2, '0');
  const formattedMinutes = String(mins).padStart(2, '0');

  // Combine to form the time string
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export const getData = async (endpoint: string) => {
    console.log(URL_HEADER + endpoint)
    const res = await fetch(URL_HEADER + endpoint)
    console.log("res", res)
    const data = await res.json()
    return data;
}

export const postRequest = async (data: any, endpoint: string) => {
  const endpoint_url = URL_HEADER + endpoint;

  try {
    const response = await fetch(endpoint_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const responseData = await response.json();
    console.log('Success:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteRequest = async (endpoint: string) => {
  const endpoint_url = URL_HEADER + endpoint;

  try {
    const response = await fetch(endpoint_url, {
      method: 'DELETE',
      
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    console.log('Resource deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};


