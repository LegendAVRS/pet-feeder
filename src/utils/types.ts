export type HomeData = {
    food: number;
    water: number;
    duration: number;
    temp: number;
    humid: number;
    nextFeed: FeedData;
    prevFeed: FeedData;
    lastImg: ImageData;
} 

export type VideoData = {
    video_url: string;
    time: number;
};

export type DevData = {
    software: string;
    ip: string;
    board: string;
    wifi: string
}

export type LogData = {
    logs: string[];
}

export type EnvironmentData = {
    tempList: ValueTime[];
    humidList: ValueTime[];
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
    time: string;// 0505 would be 05:05
    isOn: boolean;
    id: number;
};

export type ImageData = {
    image_url: string;
    time: number;
};

export type GalleryData = {
    images: ImageData[];
};

export const URL_HEADER = "http://localhost:3000"
export const HOME_DATA_URL = "/api/homeData"
export const GALLERY_URL = "/api/gallery/"
export const FEED_HISTORY_URL = "/api/foodDrink/"
export const ENVIRONMENT_HISTORY_URL = "/api/environment/"
export const FEED_SCHEDULE_URL = "/api/schedule"
export const LOG_URL = "/api/log"
export const VIDEO_URL = "/api/video"
export const DEVICE_URL = "/api/status"

export const FOOD_WARNING_THRESHOLD = 500
export const WATER_WARNING_THRESHOLD = 500
export const TEMPERATURE_WARNING_THRESHOLD = 30
export const HUMIDITY_WARNING_THRESHOLD = 80
export const TIME_FETCH_INTERVAL = 300000 // 5 minutes