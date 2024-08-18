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
    time: number;
};

export type DevData = {
    software: string;
    ip: string;
    board: string;
    wifi: string;
};

export type LogData = {
    logs: string[];
};

export type EnvironmentData = {
    tempList: ValueTime[];
    humidList: ValueTime[];
};

export type EnvironmentWrapperData = {
    environmentHistory: [
        {
            tempature: number;
            humidity: number;
            time: number;
        }
    ];
};

export type PetStatusData = {
    feedList: ValueTime[];
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
    duration: number;
    url: string;
};

export type GalleryData = {
    url: string;
    time: number;
};

export type ImagesData = {
    images: GalleryData[];
};

export const URL_HEADER = "http://localhost:3000";
export const HOME_DATA_URL = "/api/homeData/";
export const IMAGE_URL = "/api/image/";
export const VIDEO_URL = "/api/video/";
export const FEED_HISTORY_URL = "/api/foodDrink/";
export const ENVIRONMENT_HISTORY_URL = "/api/environment/";
export const FEED_SCHEDULE_URL = "/api/schedule/";
export const LOG_URL = "/api/log/";
export const CAMERA_URL = "/api/camera/";
export const DEVICE_URL = "/api/status/";
export const FEED_NOW_URL = "/api/feedNow/";

export const FOOD_WARNING_THRESHOLD = 500;
export const WATER_WARNING_THRESHOLD = 500;
export const TEMPERATURE_WARNING_THRESHOLD = 30;
export const HUMIDITY_WARNING_THRESHOLD = 200;
export const TIME_FETCH_INTERVAL = 300000; // 5 minutes
