import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { getLineChart, getOunces } from "./utils/helpers";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import DatePicker from "react-datepicker";
import { FeedHistoryData, WaterHistoryData } from "./utils/types";
import { FEED_HISTORY_URL, WATER_HISTORY_URL } from "./utils/global";
import useData from "./hooks/useData";
import LoadingPage from "./LoadingPage";
import { useSettings } from "./SettingsContext";

const PetStatus = () => {
    const [startDate, setStartDate] = useState<Date>((() => {
        const tmp = new Date();
        tmp.setMonth(tmp.getMonth() - 1)
        return tmp
    })());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const { inOunce } = useSettings();
    const {
        data: feedData,
        refreshData: refreshData1,
        error: error1,
    } = useData<FeedHistoryData>(FEED_HISTORY_URL, {
        startDate: Math.floor(startDate.getTime() / 1000),
        endDate: Math.floor(endDate.getTime() / 1000),
    });

    const {
        data: waterData,
        refreshData: refreshData2,
        error: error2,
    } = useData<WaterHistoryData>(WATER_HISTORY_URL, {
        startDate: Math.floor(startDate.getTime() / 1000),
        endDate: Math.floor(endDate.getTime() / 1000),
    });

    useEffect(() => {
        refreshData1();
        refreshData2();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    if (error1) {
        throw new Error(error1);
    }

    if (error2) {
        throw new Error(error2);
    }

    if (!feedData || !waterData) {
        return <LoadingPage></LoadingPage>;
    }

    const foodChart = getLineChart(feedData.feedList, "Grams", 1000);
    const waterChart = getLineChart(
        waterData.waterList,
        inOunce ? "Oz" : "ml",
        getOunces(inOunce, 50)
    );
    return (
        <>
            <NavBar label="Pet Status"></NavBar>
            <section className="px-6 flex flex-col items-center">
                <div className="flex text-lg font-bold items-center gap-2">
                    <p>From:</p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date || new Date())}
                        selectsStart
                        startDate={startDate || undefined}
                        endDate={endDate || undefined}
                        className="border border-slate-300 rounded-md px-2 py-1 w-[8rem] text-center"
                    />

                    <p>to</p>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date || new Date())}
                        selectsEnd
                        startDate={startDate || undefined}
                        endDate={endDate || undefined}
                        minDate={startDate || undefined}
                        className="border border-slate-300 rounded-md px-2 py-1 w-[8rem] text-center"
                    />
                </div>
                <div className="border border-slate-300 m-2 w-full"></div>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Eating time</h3>
                </div>
                <Line data={foodChart.chartData} options={foodChart.options} />
                <div className="h-4"></div>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Water comsumed</h3>
                </div>
                <Line
                    data={waterChart.chartData}
                    options={waterChart.options}
                />
            </section>
        </>
    );
};

export default PetStatus;
