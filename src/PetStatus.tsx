import { useState } from "react";
import { useFeederContext } from "./context/FeederContext";
import NavBar from "./NavBar";
import { getLineChart } from "./utils/helpers";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import DatePicker from "react-datepicker";

const PetStatus = () => {
    const { data } = useFeederContext();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const foodChart = getLineChart(startDate, endDate, data.feedHistory);
    return (
        <>
            <NavBar label="Pet Status"></NavBar>
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
                    <h3 className="text-2xl font-semibold">Eating time</h3>
                </div>
                <Line data={foodChart} />
                <div className="h-4"></div>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Water comsumed</h3>
                </div>
                <canvas id="water-chart"></canvas>
            </section>
        </>
    );
};

export default PetStatus;
