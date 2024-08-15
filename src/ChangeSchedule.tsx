import NavBar from "./NavBar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { postRequest, deleteRequest } from "./utils/helpers";
import { useRef, useState } from "react";
import AddSchedule from "./AddSchedule";
import { FEED_SCHEDULE_URL, ScheduleData } from "./utils/types";
import useData from "./hooks/useData";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";

const ChangeSchedule = () => {
    // Initialize hooks at the top level of the component
    const { data, setData, refreshData, error } =
        useData<ScheduleData>(FEED_SCHEDULE_URL);
    if (error) {
        throw new Error(error);
    }
    const [chosenIndex, setChosenIndex] = useState(-1);
    const modalRef = useRef<HTMLDialogElement>(null);

    if (!data) {
        return <LoadingPage></LoadingPage>;
    }

    const schedule = data.schedule;

    const handleCheckChange = async (index: number) => {
        const dataCopy = { ...data };
        dataCopy.schedule[index].isOn = !dataCopy.schedule[index].isOn;

        // Update the data locally
        setData(dataCopy);

        // Send the update to the server and wait for the response
        await postRequest(
            dataCopy.schedule[index],
            `${FEED_SCHEDULE_URL}/${dataCopy.schedule[index].id}`
        );

        refreshData();
    };

    const handleDeleteThingy = async (index: number) => {
        try {
            const dataCopy = { ...data };

            // Send the delete request to the server and wait for the response
            await deleteRequest(
                `${FEED_SCHEDULE_URL}/${dataCopy.schedule[index].id}`
            );
            toast.success("Success: Deleted schedule");
            refreshData();
        } catch (error) {
            toast.error("Error: Failed to delete schedule");
        }
    };

    const handleEditThingy = (index: number) => {
        setChosenIndex(index);
        modalRef.current?.showModal();
    };

    return (
        <section className="h-screen w-screen overflow-hidden">
            <div className="h-screen w-screen overflow-hidden flex flex-col">
                <NavBar label="Feed Schedule">
                    <button
                        role="button"
                        className="font-semibold p-4 bg-black text-white rounded-full"
                        onClick={() => {
                            setChosenIndex(-1);
                            modalRef.current?.showModal();
                        }}
                    >
                        <p className="w-full text-xl font-bold text-center">
                            + Add schedule
                        </p>
                    </button>
                </NavBar>

                <section className="px-6 flex flex-col gap-2 overflow-y-auto max-h-[100%] grow">
                    {schedule.length === 0 && (
                        <div className="text-xl font-bold text-neutral-400 flex grow items-center justify-center">
                            There is no schedule
                        </div>
                    )}
                    {schedule.map((thingy, index) => (
                        <div
                            className="p-4 rounded-2xl border border-slate-300"
                            onClick={() => handleEditThingy(index)}
                            key={index}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-semibold">
                                    {thingy.time}
                                </p>
                                <XMarkIcon
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteThingy(index);
                                    }}
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
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <dialog className="modal" id="cum" ref={modalRef}>
                <div className="modal-box h-full">
                    <AddSchedule
                        modalRef={modalRef}
                        chosenSchedule={schedule[chosenIndex]}
                        isAdd={chosenIndex === -1}
                        refreshData={refreshData}
                    ></AddSchedule>
                </div>
                <form method="dialog" className="modal-backdrop w-screen">
                    <button className="cursor-default">close</button>
                </form>
            </dialog>
        </section>
    );
};

export default ChangeSchedule;
