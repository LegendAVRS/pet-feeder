export type FeederData = {
    foodAmount: number;
    waterAmount: number;
    timeAutoFeedDuration: number;
    feedSchdule: FeedData[];
    temperature: number;
    humidity: number;
    battery: number;
    capturedImages: ImageData[];
    feedHistory: ValueTime[];
    environmentHistory: {
        temperatureHistory: ValueTime[];
        humidityHistory: ValueTime[];
    };
};

export type ValueTime = {
    value: number;
    time: number;
};

export type FeedData = ValueTime & {
    isOn: boolean;
};

export type ImageData = {
    src: string;
    capturedTime: number;
};

export const getDummyData = (): FeederData => {
    const dummyFeederData: FeederData = {
        foodAmount: 500, // in grams
        waterAmount: 1000, // in milliliters
        timeAutoFeedDuration: 30, // in minutes
        feedSchdule: [
            {
                value: 100, // in grams
                time: 1625078400, // UNIX timestamp for 2021-07-01T12:00:00Z
                isOn: true,
            },
            {
                value: 150, // in grams
                time: 1625114400, // UNIX timestamp for 2021-07-01T22:00:00Z,
                isOn: true,
            },
        ],
        temperature: 24, // in Celsius
        humidity: 60, // in percentage
        battery: 80, // in percentage
        capturedImages: [
            {
                src: "https://i.kym-cdn.com/photos/images/original/002/269/118/f8c.jpg",
                capturedTime: 1625078400, // UNIX timestamp for 2021-07-01T12:00:00Z
            },
            {
                src: "https://i.kym-cdn.com/photos/images/original/002/269/118/f8c.jpg",
                capturedTime: 1625114400, // UNIX timestamp for 2021-07-01T22:00:00Z
            },
        ],
        feedHistory: [
            {
                value: 100, // in grams
                time: 1625078400, // UNIX timestamp for 2021-07-01T12:00:00Z
            },
            {
                value: 150, // in grams
                time: 1625114400, // UNIX timestamp for 2021-07-01T22:00:00Z,
            },
        ],
        environmentHistory: {
            temperatureHistory: [
                { value: 24, time: 1625078400 }, // in Celsius
                { value: 23, time: 1625082000 },
                { value: 22, time: 1625085600 },
                { value: 24, time: 1625089200 },
                { value: 25, time: 1625092800 },
            ],
            humidityHistory: [
                { value: 60, time: 1625078400 }, // in percentage
                { value: 59, time: 1625082000 },
                { value: 58, time: 1625085600 },
                { value: 60, time: 1625089200 },
                { value: 61, time: 1625092800 },
            ],
        },
    };
    return dummyFeederData;
};
