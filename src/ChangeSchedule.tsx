import { Link } from "react-router-dom";
import { useFeederContext } from "./context/FeederContext";
import NavBar from "./NavBar";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ChangeSchedule = () => {
    const { data, setData } = useFeederContext();
    const schedule = data.feedSchdule;
    const handleCheckChange = (index: number) => {
        const dataCopy = { ...data };
        dataCopy.feedSchdule[index].isOn = !dataCopy.feedSchdule[index].isOn;
        setData(dataCopy);
    };
    const handleDeleteThingy = (index: number) => {
        const dataCopy = { ...data };
        dataCopy.feedSchdule.splice(index, 1);
        setData(dataCopy);
    };
    return (
        <>
            <NavBar label="Feed Schedule"></NavBar>
            <section className="px-6 flex flex-col gap-2">
                {schedule.map((thingy, index) => (
                    <div className="p-4 rounded-2xl border border-slate-300">
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-semibold">
                                {thingy.time}
                            </p>
                            <XMarkIcon
                                className="cursor-pointer"
                                onClick={() => handleDeleteThingy(index)}
                                width={30}
                            ></XMarkIcon>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Amount: {thingy.value}g</p>
                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <span className="label-text">
                                        {thingy.isOn ? "On" : "Off"}
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        checked={thingy.isOn}
                                        onChange={() =>
                                            handleCheckChange(index)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
                <Link
                    role="button"
                    to="/add-schedule"
                    className="fixed bottom-4 left-4 right-4 font-semibold p-4 bg-black text-white rounded-full"
                >
                    <p className="w-full text-xl font-bold text-center">
                        + Add schedule
                    </p>
                </Link>
            </section>
        </>
    );
};

export default ChangeSchedule;
