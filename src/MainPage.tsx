import { Link } from "react-router-dom";
import {
    getPieChart,
    postRequest,
    unixToDateTimeString,
} from "./utils/helpers";
import { Pie } from "react-chartjs-2";
import {
    MAX_FOOD_THRESHOLD,
    MAX_HUMIDITY_THRESHOLD,
    MAX_TEMP_THRESHOLD,
    MAX_WATER_THRESHOLD,
} from "./utils/global";
import {
    FEED_NOW_URL,
    FOOD_WARNING_THRESHOLD,
    HOME_DATA_URL,
    HomeData,
    HUMIDITY_WARNING_THRESHOLD,
    TEMPERATURE_WARNING_THRESHOLD,
    WATER_WARNING_THRESHOLD,
} from "./utils/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useData from "./hooks/useData";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const MainPage = () => {
    const { data, error, refreshData } = useData<HomeData>(HOME_DATA_URL);

    if (error) {
        throw new Error(error);
    }

    if (!data) {
        return <LoadingPage></LoadingPage>;
    }

    const nextFeedData = data.nextFeed;
    const lastFeedData = data.prevFeed;
    const lastImgData = data.lastImg;

    const { pieChartData: foodChartData, pieChartOption: foodChartOption } =
        getPieChart(
            "Food",
            [data.food, MAX_FOOD_THRESHOLD],
            FOOD_WARNING_THRESHOLD,
            false
        );

    const { pieChartData: waterChartData, pieChartOption: waterChartOption } =
        getPieChart(
            "Water",
            [data.water, MAX_WATER_THRESHOLD],
            WATER_WARNING_THRESHOLD,
            false
        );

    const { pieChartData: tempChartData, pieChartOption: tempChartOption } =
        getPieChart(
            "temp",
            [data.temp, MAX_TEMP_THRESHOLD],
            TEMPERATURE_WARNING_THRESHOLD
        );

    const { pieChartData: humidChartData, pieChartOption: humidChartOption } =
        getPieChart(
            "humid",
            [data.humid, MAX_HUMIDITY_THRESHOLD],
            HUMIDITY_WARNING_THRESHOLD
        );

    const handleFeedNow = async () => {
        try {
            await postRequest(null, FEED_NOW_URL);
            toast.success("Success: Feed now success");
            refreshData();
        } catch (error: any) {
            toast.error("Error: Failed to feed");
        }
    };
    return (
        <>
            <nav className="h-20 p-6 flex items-center justify-between font-bold text-3xl">
                <h1>Dashboard</h1>
                <Link to="./status" className="h-full">
                    <InformationCircleIcon className="h-full"></InformationCircleIcon>
                </Link>
            </nav>
            <section className="px-6">
                <section className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                    <Link to="./gallery" className="block w-full h-full">
                        <img
                            src={lastImgData?.image_url}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-black to-transparent to-25%"></div>
                        <p className="text-white z-50 absolute bottom-4 left-4 text-2xl font-semibold">
                            Captured on {unixToDateTimeString(lastImgData.time)}
                        </p>
                    </Link>
                    <Link
                        role="button"
                        to="./video-call"
                        className="absolute top-4 right-4 z-50 bg-green-400 px-4 py-2 rounded-full"
                    >
                        See Live
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
                        <p>{data.duration}</p>
                    </div>
                    <div className="flex items-center justify-between text-md">
                        <p>Amount:</p>
                        <p>{nextFeedData?.value}</p>
                    </div>
                    <div className="h-4"></div>
                    <div className="flex gap-4 w-full">
                        <button
                            className="basis-1/2 font-semibold text-center py-1 px-4 bg-black text-white rounded-full"
                            onClick={handleFeedNow}
                        >
                            Feed now
                        </button>
                        <Link
                            to="./change-schedule"
                            className="basis-1/2 text-center font-semibold py-1 px-4 bg-black text-white rounded-full"
                        >
                            Change schedule
                        </Link>
                        <Link
                            to="./pet-status"
                            className="basis-1/2 text-center font-semibold py-1 px-4 bg-black text-white rounded-full"
                        >
                            Pet Status
                        </Link>
                    </div>
                </section>
                <div className="h-4"></div>
                <section className="p-4 rounded-2xl border border-slate-300 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Enviroment</p>
                        <Link to="./environment" className="text-2xl">
                            →
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.temp}
                            </p>
                            <Pie
                                data={tempChartData}
                                options={tempChartOption}
                            ></Pie>
                        </div>
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.humid}
                            </p>
                            <Pie
                                data={humidChartData}
                                options={humidChartOption}
                            ></Pie>
                        </div>
                    </div>
                    {data.temp > TEMPERATURE_WARNING_THRESHOLD && (
                        <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                            temp is higher than normal
                        </div>
                    )}
                    {data.humid < HUMIDITY_WARNING_THRESHOLD && (
                        <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                            humid is lower than normal
                        </div>
                    )}
                </section>
                <section className="p-4 rounded-2xl border border-slate-300  flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Enviroment</p>
                        <Link to="./environment" className="text-2xl">
                            →
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.food}
                            </p>
                            <Pie
                                data={foodChartData}
                                options={foodChartOption}
                            ></Pie>
                        </div>
                        <div className="basis-1/2 w-32 aspect-square relative">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl">
                                {data.water}
                            </p>
                            <Pie
                                data={waterChartData}
                                options={waterChartOption}
                            ></Pie>
                        </div>
                    </div>
                    {data.food < FOOD_WARNING_THRESHOLD && (
                        <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                            Food is running out
                        </div>
                    )}
                    {data.water < WATER_WARNING_THRESHOLD && (
                        <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                            Water is running out
                        </div>
                    )}
                </section>
            </section>
        </>
    );
};

export default MainPage;
