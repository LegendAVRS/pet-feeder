import { useNavigate } from "react-router-dom";
import { useFeederContext } from "./context/FeederContext";
import NavBar from "./NavBar";
import { useState } from "react";

const AddSchedule = () => {
    const { data, setData } = useFeederContext();
    const navigator = useNavigate();
    const handleSaveSchedule = () => {
        const dataCopy = { ...data };
        dataCopy.feedSchdule.push({
            value: value,
            time: hour * minute,
            isOn: true,
        });
        setData(dataCopy);
        navigator(-1);
    };

    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);

    const [value, setFeedAmount] = useState(10);
    const [feedDuration, setFeedDuration] = useState(10);

    return (
        <>
            <NavBar label="Add Schedule"></NavBar>
            <section className="px-6">
                <div className="flex items-center justify-center gap-4 h-[20vh]">
                    <input
                        type="number"
                        placeholder="10"
                        className="aspect-square w-32 flex items-center justify-center rounded-2xl border border-slate-300 font-semibold text-[5rem]"
                        onChange={(e) => {
                            setHour(parseInt(e.target.value));
                        }}
                        value={hour}
                    ></input>
                    <input
                        type="number"
                        placeholder="00"
                        className="aspect-square w-32 flex items-center justify-center rounded-2xl border border-slate-300 font-semibold text-[5rem]"
                        onChange={(e) => {
                            setMinute(parseInt(e.target.value));
                        }}
                        value={minute}
                    ></input>
                </div>
                <div className="p-4 rounded-2xl border border-slate-300 flex items-center justify-between">
                    <p>Audio</p>
                    <button className="font-semibold py-1 px-4 bg-black text-white rounded-full">
                        Select file
                    </button>
                </div>
                <div className="h-4"></div>
                <div className="p-4 rounded-2xl border border-slate-300 flex items-center justify-between">
                    <p>Food Amount</p>
                    <div className="flex gap-1 py-1">
                        <input
                            className="w-12 text-right"
                            type="text"
                            inputMode="numeric"
                            placeholder="30"
                            value={value}
                            onChange={(e) => {
                                setFeedAmount(parseInt(e.target.value));
                            }}
                        />
                        <p>g</p>
                    </div>
                </div>
                <div className="h-4"></div>
                <div className="p-4 rounded-2xl border border-slate-300 flex items-center justify-between">
                    <p>Feed Duration</p>
                    <div className="flex gap-1 py-1">
                        <input
                            className="w-12 text-right"
                            type="text"
                            inputMode="numeric"
                            placeholder="30"
                            value={feedDuration}
                            onChange={(e) => {
                                setFeedDuration(parseInt(e.target.value));
                            }}
                        />
                        <p>mins</p>
                    </div>
                </div>
                <button
                    onClick={() => handleSaveSchedule()}
                    className="fixed bottom-4 left-4 right-4 font-semibold p-4 bg-black text-white rounded-full"
                >
                    <p className="w-full text-xl font-bold text-center">Save</p>
                </button>
            </section>
        </>
    );
};

export default AddSchedule;
