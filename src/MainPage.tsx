import { Link } from "react-router-dom";
import { useFeederContext } from "./context/FeederContext";
import {
    getLastValue,
    getNextFeed,
    getPieChart,
    getPrevFeed,
} from "./utils/helpers";
import { Pie } from "react-chartjs-2";
import {
    MAX_FOOD_THRESHOLD,
    MAX_HUMIDITY_THRESHOLD,
    MAX_TEMP_THRESHOLD,
    MAX_WATER_THRESHOLD,
} from "./utils/global";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MainPage = () => {
    const { data } = useFeederContext();
    const schedule = data.feedSchdule;
    const nextFeedData = getNextFeed(schedule);
    const lastFeedData = getPrevFeed(schedule);
    const lastCapturedImageData = getLastValue(data.capturedImages);

    const { pieChartData: foodChartData, pieChartOption: foodChartOption } =
        getPieChart("Food", [data.foodAmount, MAX_FOOD_THRESHOLD]);

    const { pieChartData: waterChartData, pieChartOption: waterChartOption } =
        getPieChart("Water", [data.waterAmount, MAX_WATER_THRESHOLD]);

    const { pieChartData: tempChartData, pieChartOption: tempChartOption } =
        getPieChart("Temperature", [data.temperature, MAX_TEMP_THRESHOLD]);

    const {
        pieChartData: humidityChartData,
        pieChartOption: humidityChartOption,
    } = getPieChart("Humidity", [data.humidity, MAX_HUMIDITY_THRESHOLD]);

    return (
        <>
            <nav className="h-20 p-6 flex items-center justify-between font-bold text-3xl">
                <h1 className="">Dashboard</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                >
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
            </nav>
            <section className="px-6">
                <section className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                    <Link to="./gallery" className="block w-full h-full">
                        <img
                            src={lastCapturedImageData?.src}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-black to-transparent to-25%"></div>
                        <p className="text-white z-50 absolute bottom-4 left-4 text-2xl font-semibold">
                            Captured on {lastCapturedImageData.capturedTime}
                        </p>
                        <Link
                            role="button"
                            to="./video-call"
                            className="absolute top-4 right-4 z-50 bg-green-400 px-4 py-2 rounded-full"
                        >
                            See Live
                        </Link>
                    </Link>
                </section>
                <div className="w-full h-4"></div>
                <section className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex items-center justify-between font-semibold text-2xl">
                        <p>Next Feed:</p>
                        <p>{nextFeedData?.value}</p>
                    </div>
                    <div className="h-4"></div>
                    <div className="flex items-center justify-between text-md">
                        <p>Last Feed:</p>
                        <p>{lastFeedData?.value}</p>
                    </div>
                    <div className="flex items-center justify-between text-md">
                        <p>Time eat:</p>
                        <p>{data.timeAutoFeedDuration}</p>
                    </div>
                    <div className="flex items-center justify-between text-md">
                        <p>Amount:</p>
                        <p>{nextFeedData?.value}</p>
                    </div>
                    <div className="h-4"></div>
                    <div className="flex gap-4 w-full">
                        <button className="basis-1/2 font-semibold text-center py-1 px-4 bg-black text-white rounded-full">
                            Feed now
                        </button>
                        <Link
                            to="./change-schedule"
                            className="basis-1/2 text-center font-semibold py-1 px-4 bg-black text-white rounded-full"
                        >
                            Change schedule
                        </Link>
                    </div>
                </section>
                <div className="h-4"></div>
                <section className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Pet's status</p>
                        <Link to="./pet-status" className="text-2xl">
                            →
                        </Link>
                    </div>
                    <div className="h-4"></div>
                    <div className="w-full flex flex-1 overflow-auto">
                        <div className="flex w-full gap-8"></div>
                    </div>
                </section>
                <div className="h-4"></div>
                <section className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Enviroment</p>
                        <Link to="./enviroment" className="text-2xl">
                            →
                        </Link>
                    </div>
                    <div className="h-4"></div>
                    <div className="flex items-center gap-4">
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.temperature}
                            </p>
                            <Pie
                                data={tempChartData}
                                options={tempChartOption}
                            ></Pie>
                        </div>
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.humidity}
                            </p>
                            <Pie
                                data={humidityChartData}
                                options={humidityChartOption}
                            ></Pie>
                        </div>
                    </div>
                </section>
                <div className="h-4"></div>
                <section className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Device status</p>
                        <Link to="./device-status" className="text-2xl">
                            →
                        </Link>
                    </div>
                    <div className="h-1"></div>
                    <p className="text-md">
                        Battery: {data.battery}%, about 4hrs left
                    </p>
                    <div className="flex gap-4">
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.foodAmount}
                            </p>
                            <Pie
                                data={foodChartData}
                                options={foodChartOption}
                            ></Pie>
                        </div>
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.waterAmount}
                            </p>
                            <Pie
                                data={waterChartData}
                                options={waterChartOption}
                            ></Pie>
                        </div>
                    </div>
                    <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                        <p>Consider adding food and water soon</p>
                    </div>
                </section>
                <div className="h-4"></div>
            </section>
        </>
    );
};

export default MainPage;
