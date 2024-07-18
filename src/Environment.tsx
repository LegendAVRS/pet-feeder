import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import { useFeederContext } from "./context/FeederContext";
import "chart.js/auto"; // ADD THIS
import { getLineChart } from "./utils/helpers";

const Environment = () => {
    const { data } = useFeederContext();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const temperatureChart = getLineChart(
        startDate,
        endDate,
        data.environmentHistory.temperatureHistory
    );
    const humidityChart = getLineChart(
        startDate,
        endDate,
        data.environmentHistory.humidityHistory
    );

    // Cleanup logic to destroy chart instances
    return (
        <section className="px-6">
            <div className="flex text-xl font-bold items-center gap-2">
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
            <Line data={temperatureChart} />
            <div className="h-4"></div>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Humidity</h3>
            </div>
            <Line data={humidityChart} />
        </section>
    );
};

export default Environment;
