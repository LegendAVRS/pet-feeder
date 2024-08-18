import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { getLineChart } from "./utils/helpers";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import DatePicker from "react-datepicker";
import { FEED_HISTORY_URL, PetStatusData } from "./utils/types";
import useData from "./hooks/useData";
import LoadingPage from "./LoadingPage";

const PetStatus = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const { data, refreshData, error } = useData<PetStatusData>(
        FEED_HISTORY_URL,
        {
            start: startDate,
            end: endDate,
        }
    );

    if (error) {
        throw new Error(error);
    }

    useEffect(() => {
        refreshData();
    }, [startDate, endDate]);

    if (!data) {
        return <LoadingPage></LoadingPage>;
    }

    const foodChart = getLineChart(
        startDate,
        endDate,
        data.feedList,
        "Grams",
        1000
    );
    const waterChart = getLineChart(
        startDate,
        endDate,
        data.waterList,
        "Milliliters",
        1000
    );
    return (
        <>
            <NavBar label="Pet Status"></NavBar>
            <section className="px-6 flex flex-col items-center">
                <div className="flex text-lg font-bold items-center gap-2">
                    <p>From:</p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate || undefined}
                        endDate={endDate || undefined}
                        className="border border-slate-300 rounded-md px-2 py-1 w-[8rem] text-center"
                    />

                    <p>to</p>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
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
