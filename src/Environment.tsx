import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getLineChart } from "./utils/helpers";
import { EnvironmentData, EnvironmentWrapperData } from "./utils/types";
import { ENVIRONMENT_HISTORY_URL } from "./utils/global";
import useData from "./hooks/useData";
import LoadingPage from "./LoadingPage";
import NavBar from "./NavBar";

const Environment = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const endDate = useMemo(() => {
        const date = new Date(startDate?.getTime() || "")
        date.setDate((date.getDate() + 31) % 30)
        return date
    }, [startDate])
    const {
        data: dataWrapper,
        refreshData,
        error,
    } = useData<EnvironmentWrapperData>(ENVIRONMENT_HISTORY_URL, {
        startDate: Math.floor(startDate.getTime() / 1000),
        endDate: Math.floor(endDate.getTime() / 1000),
    });

    useEffect(() => {
       refreshData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    if (error) {
        throw new Error(error);
    }
    if (!dataWrapper) {
        return <LoadingPage></LoadingPage>;
    }

    console.log(dataWrapper);
    let data: EnvironmentData = {
        tempList: [],
        humidList: [],
    };

    if (dataWrapper.environmentHistory) {
        data = {
            tempList: dataWrapper.environmentHistory.map((env) => ({
                value: env.temperature,
                time: env.time,
            })),
            humidList: dataWrapper.environmentHistory.map((env) => ({
                value: env.humidity,
                time: env.time,
            })),
        };
    }

    const temperatureChart = getLineChart(data.tempList, "Celsius");
    const humidityChart = getLineChart(data.humidList, "%");

    return (
        <>
            <NavBar label="Environment"></NavBar>
            <section className="px-6 flex flex-col items-center">
                <div className="flex text-lg font-bold items-center gap-2">
                    <p>In:</p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date || new Date())}
                        selectsStart
                        startDate={startDate || undefined}
                        endDate={undefined}
                        className="border border-slate-300 rounded-md px-2 py-1 w-[8rem] text-center"
                    />
                </div>
                <div className="border border-slate-300 m-2 w-full"></div>
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
        </>
    );
};

export default Environment;
