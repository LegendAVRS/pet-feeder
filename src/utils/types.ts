export type HomeData = {
    food: number;
    water: number;
    temp: number;
    humid: number;
    nextFeed: FeedData;
    prevFeed: FeedData;
    lastImg: GalleryData;
};

export type VideoData = {
    url: string;
};

export type DevData = {
    software: string;
    ip: string;
    board: string;
    wifi: string;
};

export type LogData = {
    log: string;
    time: number;
};

export type LogsData = {
    logs: LogData[];
};

export type EnvironmentData = {
    tempList: ValueTime[];
    humidList: ValueTime[];
};

export type EnvironmentWrapperData = {
    environmentHistory: [
        {
            temperature: number;
            humidity: number;
            time: number;
        }
    ];
};

export type FeedHistoryData = {
    feedList: ValueTime[];
};

export type WaterHistoryData = {
    waterList: ValueTime[];
};

export type ScheduleData = {
    schedule: FeedData[];
};

export type ValueTime = {
    value: number;
    time: number;
};

export type FeedData = {
    value: number;
    time: string; // 0505 would be 05:05
    isOn: boolean;
    id: number;
    feed_duration: number;
    url: string;
};

export type GalleryData = {
    url: string;
    time: number;
};

export type ImageData = {
    image_url: string;
    time: number;
};

export type ImagesData = {
    images: GalleryData[];
};

export type VideosData = {
    videos: GalleryData[];
};
