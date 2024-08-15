import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getLineChart } from "./utils/helpers";
import { ENVIRONMENT_HISTORY_URL, EnvironmentData } from "./utils/types";
import useData from "./hooks/useData";
import LoadingPage from "./LoadingPage";

const Environment = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const { data, refreshData, error } = useData<EnvironmentData>(
        ENVIRONMENT_HISTORY_URL,
        { start: startDate, end: endDate }
    );

    useEffect(() => {
        refreshData();
    }, [startDate, endDate]);

    if (error) {
        throw new Error(error);
    }

    if (!data) {
        return <LoadingPage></LoadingPage>;
    }

    const temperatureChart = getLineChart(
        startDate,
        endDate,
        data.tempList,
        "Celsius"
    );
    const humidityChart = getLineChart(startDate, endDate, data.humidList, "%");

    return (
        <section className="px-6 mt-2">
            <div className="flex text-lg font-bold items-center gap-2">
                <p>From:</p>

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    className="border border-slate-300 rounded-md px-4 py-1"
                />
                <p>to</p>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    minDate={startDate || undefined}
                    className="border border-slate-300 rounded-md px-4 py-1"
                />
            </div>
            <div className="border border-slate-300 m-2"></div>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Temperature</h3>
            </div>
            <Line
                data={temperatureChart.chartData}
                options={temperatureChart.options}
            />
            <div className="h-4"></div>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Humidity</h3>
            </div>
            <Line
                data={humidityChart.chartData}
                options={humidityChart.options}
            />
        </section>
    );
};

export default Environment;
