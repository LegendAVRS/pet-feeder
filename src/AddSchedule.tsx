import { RefObject, useEffect, useState } from "react";
import { postRequest } from "./utils/helpers"; // import the postRequest function
import { FeedData } from "./utils/types";
import { FEED_SCHEDULE_URL } from "./utils/global";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { MAX_FOOD_THRESHOLD } from "./utils/global";

interface Props {
    isAdd: boolean;
    chosenSchedule?: FeedData;
    modalRef: RefObject<HTMLDialogElement>;
    schedule: FeedData[];
    refreshData: () => void;
}

const AddSchedule = ({
    isAdd,
    chosenSchedule,
    modalRef,
    refreshData,
    schedule,
}: Props) => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleAddSchedule = async () => {
        // return if time is already in the schedule
        const hourStr = hour < 10 ? "0" + hour : hour.toString();
        const minuteStr = minute < 10 ? "0" + minute : minute.toString();
        if (schedule.find((s) => s.time === `${hourStr}${minuteStr}`)) {
            alert("Time already exists in schedule");
            return;
        }
        try {
            const hourStr = hour < 10 ? "0" + hour : hour.toString();
            const minuteStr = minute < 10 ? "0" + minute : minute.toString();
            setLoading(true);
            await postRequest(
                {
                    time: `${hourStr}:${minuteStr}:00`,
                    value: feedAmount,
                    feed_duration: feedDuration,
                    isOn: true,
                    url: selectedFile?.name, // placeholder
                },
                FEED_SCHEDULE_URL
            );
            setLoading(false);
            refreshData();
            toast.success("Success: Edited schedule");
            modalRef.current?.close();
        } catch (error) {
            // put toast's zIndex higher than the modal
            modalRef.current?.close();
            setLoading(false);
            toast.error("Error: Failed to edit schedule");
        }
    };

    const handleEditSchedule = async () => {
        // convert hour and minute to the correct format string
        const hourStr = hour < 10 ? "0" + hour : hour.toString();
        const minuteStr = minute < 10 ? "0" + minute : minute.toString();
        if (
            schedule.find((s) => s.time === `${hourStr}${minuteStr}`) &&
            chosenSchedule!.time !== `${hourStr}${minuteStr}`
        ) {
            alert("Time already exists in schedule");
            return;
        }

        try {
            const hourStr = hour < 10 ? "0" + hour : hour.toString();
            const minuteStr = minute < 10 ? "0" + minute : minute.toString();
            setLoading(true);
            await postRequest(
                {
                    time: `${hourStr}:${minuteStr}:00`,
                    value: feedAmount,
                    feed_duration: feedDuration,
                    isOn: chosenSchedule!.isOn,
                    url: selectedFile?.name,
                },
                FEED_SCHEDULE_URL + `${chosenSchedule!.id}`
            );
            setLoading(false);
            refreshData();
            toast.success("Success: Edited schedule");
            modalRef.current?.close();
        } catch (error) {
            modalRef.current?.close();
            setLoading(false);
            toast.error("Error: Failed to edit schedule");
        }
    };

    const defaultVal =
        isAdd === false
            ? {
                  hour: chosenSchedule!.time.slice(0, 2),
                  minute: chosenSchedule!.time.slice(2, 4),
                  value: chosenSchedule!.value,
                  feed_duration: chosenSchedule!.feed_duration,
              }
            : {
                  hour: "10",
                  minute: "00",
                  value: 10,
                  feed_duration: 10,
              };
    const [hour, setHour] = useState(parseInt(defaultVal.hour));
    const [minute, setMinute] = useState(parseInt(defaultVal.minute));
    const [feedAmount, setFeedAmount] = useState(defaultVal.value);
    const [feedDuration, setFeedDuration] = useState(10);

    useEffect(() => {
        if (isAdd === false) {
            setHour(parseInt(defaultVal.hour));
            setMinute(parseInt(defaultVal.minute));
            setFeedAmount(defaultVal.value);
            setFeedDuration(defaultVal.feed_duration);
            if (chosenSchedule!.url) {
                setSelectedFile(new File([], chosenSchedule!.url));
            }
            return;
        }
        setSelectedFile(null);
        // eslint-disable-next-line
    }, [isAdd, chosenSchedule]);

    return (
        <section className="relative">
            <h1 className="font-bold text-3xl">Add / Edit</h1>
            <div className="flex items-center justify-center gap-4 h-[20vh] mt-4">
                <input
                    type="number"
                    inputMode="numeric"
                    className="aspect-square w-32 flex items-center justify-center rounded-2xl border border-slate-300 font-semibold text-center text-[5rem]"
                    onChange={(e) => {
                        setHour(parseInt(e.target.value));
                    }}
                    value={hour}
                    maxLength={2} // optional: restrict input to 2 characters
                    defaultValue={10}
                ></input>
                <input
                    type="number"
                    inputMode="numeric"
                    className="aspect-square w-32 flex items-center justify-center rounded-2xl border text-center border-slate-300 font-semibold text-[5rem]"
                    onChange={(e) => {
                        setMinute(parseInt(e.target.value));
                    }}
                    value={minute}
                    maxLength={2} // optional: restrict input to 2 characters
                    defaultValue={10}
                ></input>
            </div>
            <div className="p-4 rounded-2xl border border-slate-300 flex items-center justify-between mt-4">
                <p>Audio</p>
                <div className="flex items-center gap-2">
                    {selectedFile && (
                        <p className="max-w-28 overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {selectedFile.name}
                        </p>
                    )}
                    <button
                        className="font-semibold py-1 px-4 bg-black text-white rounded-full"
                        onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "audio/*"; // accept audio files only
                            input.onchange = (e: any) => {
                                if (e.target.files.length > 0) {
                                    setSelectedFile(e.target.files[0]);
                                }
                            };
                            input.click();
                        }}
                    >
                        Select file
                    </button>
                </div>
            </div>
            <div className="h-4"></div>
            <div className="p-4 rounded-2xl border border-slate-300 flex items-center justify-between">
                <p>Food Amount</p>
                <div className="flex gap-1 py-1">
                    <input
                        className="w-12 text-right"
                        type="number"
                        inputMode="numeric"
                        placeholder="30"
                        value={feedAmount}
                        onChange={(e) => {
                            setFeedAmount(parseInt(e.target.value));
                        }}
                        max={MAX_FOOD_THRESHOLD}
                        min={1}
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
                        type="number"
                        inputMode="numeric"
                        placeholder="30"
                        value={feedDuration}
                        onChange={(e) => {
                            setFeedDuration(parseInt(e.target.value));
                        }}
                        max={60}
                        min={1}
                    />
                    <p>mins</p>
                </div>
            </div>
            <button
                onClick={() => {
                    if (!isNaN(minute) && minute >= 0 && minute <= 59) {
                        if (!isNaN(hour) && hour >= 0 && hour <= 23) {
                            isAdd === false ? handleEditSchedule() : handleAddSchedule()
                        }
                    }
                }
                }
                className="fixed bottom-4 left-4 right-4 font-semibold p-4 bg-black text-white rounded-full"
            >
                {!loading && (
                    <p className="w-full text-xl font-bold text-center">Save</p>
                )}
                {loading && (
                    <span className="loading loading-spinner loading-md"></span>
                )}
            </button>
            <XMarkIcon
                className="absolute top-1 right-1 cursor-pointer"
                width="30"
                onClick={() => {
                    modalRef.current?.close();
                }}
            ></XMarkIcon>
        </section>
    );
};

export default AddSchedule;
