import { Link } from "react-router-dom";
import {
    getDegrees,
    getGramInOunce,
    getOunces,
    getPieChart,
    getTimeString,
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
import { HomeData } from "./utils/types";
import {
    FEED_NOW_URL,
    HOME_DATA_URL,
    HUMIDITY_WARNING_THRESHOLD,
    TEMPERATURE_WARNING_THRESHOLD,
    WATER_WARNING_THRESHOLD,
} from "./utils/global";
import { FOOD_WARNING_THRESHOLD } from "./utils/global";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useData from "./hooks/useData";
import {
    Cog6ToothIcon,
    InformationCircleIcon,
} from "@heroicons/react/16/solid";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";
import { useSettings } from "./SettingsContext";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const MainPage = () => {
    const { data, error, refreshData } = useData<HomeData>(HOME_DATA_URL);
    const { inOunce, inFahrenheit } = useSettings();

    const maxFood = getGramInOunce(inOunce, MAX_FOOD_THRESHOLD);
    const maxWater = getOunces(inOunce, MAX_WATER_THRESHOLD);
    const maxTemp = getDegrees(inFahrenheit, MAX_TEMP_THRESHOLD);

    const warningFood = getGramInOunce(inOunce, FOOD_WARNING_THRESHOLD);
    const warningWater = getOunces(inOunce, WATER_WARNING_THRESHOLD);
    const warningTemp = getDegrees(inFahrenheit, TEMPERATURE_WARNING_THRESHOLD);

    useEffect(() => {
        const tmp = setInterval(() => {
            refreshData();
        }, 30000);
        return () => {
            clearInterval(tmp);
        };
    }, [refreshData]);

    if (error) {
        throw new Error(error);
    }

    if (!data) {
        return <LoadingPage></LoadingPage>;
    }

    console.log(data);
    data.food = Math.floor(data.food);
    data.water = Math.floor(data.water);

    const nextFeedData = data.nextFeed;
    const lastFeedData = data.prevFeed;
    const lastImgData = data.lastImg;

    data.temp = getDegrees(inFahrenheit, data.temp);
    data.food = getGramInOunce(inOunce, data.food);
    data.water = getOunces(inOunce, data.water);
    data.nextFeed.value = getGramInOunce(inOunce, data.nextFeed.value);

    if (data?.temp && data?.temp > warningTemp) {
        new Notification("Temperature Alert!", {
            body: `Evironment temperature is too high: ${data.temp}°C`,
        });
    }

    const food_label = inOunce ? "Food (oz)" : "Food (grams)";
    const water_label = inOunce ? "Water (oz)" : "Water (ml)";
    const temp_label = inFahrenheit ? "Temparature (°F)" : "Temparature (°C)";

    const { pieChartData: foodChartData, pieChartOption: foodChartOption } =
        getPieChart(
            food_label,
            [data.food, maxFood - data.food],
            warningFood,
            false
        );

    const { pieChartData: waterChartData, pieChartOption: waterChartOption } =
        getPieChart(
            water_label,
            [data.water, maxWater - data.water],
            warningWater,
            false
        );

    const { pieChartData: tempChartData, pieChartOption: tempChartOption } =
        getPieChart(temp_label, [data.temp, maxTemp - data.temp], warningTemp);

    const { pieChartData: humidChartData, pieChartOption: humidChartOption } =
        getPieChart(
            "Humidity (%)",
            [data.humid, MAX_HUMIDITY_THRESHOLD - data.humid],
            HUMIDITY_WARNING_THRESHOLD
        );

    const handleFeedNow = async () => {
        try {
            await postRequest(null, FEED_NOW_URL);
            toast.success("Success: Feed now success");
            refreshData();
        } catch (error) {
            toast.error("Error: Failed to feed");
        }
    };

    return (
        <>
            <nav className="h-20 p-6 flex items-center justify-between font-bold text-3xl">
                <h1>Dashboard</h1>
                <div className="h-full flex items-center gap-4 ">
                    <Link to="./settings" className="h-full">
                        <Cog6ToothIcon className="h-full"></Cog6ToothIcon>
                    </Link>
                    <Link to="./status" className="h-full">
                        <InformationCircleIcon className="h-full"></InformationCircleIcon>
                    </Link>
                </div>
            </nav>
            <section className="px-6">
                <section className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                    <Link to="./gallery" className="block w-full h-full">
                        <img
                            src={lastImgData?.url}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-black to-transparent to-25%"></div>
                        <p className="text-white z-50 absolute bottom-4 left-4 text-2xl font-semibold flex flex-col">
                            <span>Captured on</span>
                            <span>
                                {" "}
                                {unixToDateTimeString(lastImgData.time)}
                            </span>
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
                        <p>
                            {nextFeedData.time !== "null"
                                ? getTimeString(nextFeedData?.time)
                                : ""}
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-md">
                        <p>Duration:</p>
                        <p>
                            {nextFeedData.feed_duration !== -1
                                ? nextFeedData.feed_duration
                                : ""}{" "}
                            minutes
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-md">
                        <p>Amount:</p>
                        <p>
                            {nextFeedData?.value !== -1
                                ? nextFeedData.value
                                : ""}{" "}
                            {inOunce ? "oz" : "grams"}
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-md">
                        <p>Last Feed:</p>
                        <p>
                            {lastFeedData.time !== "null"
                                ? getTimeString(lastFeedData.time)
                                : ""}
                        </p>
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
                            Edit schedule
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
                    {data.temp > warningTemp && (
                        <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                            Temparature is higher than normal
                        </div>
                    )}
                </section>
                <section className="p-4 rounded-2xl border border-slate-300  flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Food / Water</p>
                        <Link to="./pet-status" className="text-2xl">
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
                    {data.food < warningFood && (
                        <div className="px-4 py-3 rounded-xl border border-red-900 bg-red-100 text-red-900">
                            Food is running out
                        </div>
                    )}
                    {data.water < warningWater && (
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
