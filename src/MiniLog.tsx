import { Link } from "react-router-dom";
import useData from "./hooks/useData";
import { LogsData } from "./utils/types";
import { LOG_URL } from "./utils/global";
import { unixToDateTimeString } from "./utils/helpers";

const MiniLog = () => {
    const { data } = useData<LogsData>(LOG_URL);
    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data);
    return (
        <>
            <section className="px-6 mt-4 relative">
                <div className="p-4 rounded-md bg-gray-300 h-52 max-h-52 overflow-auto">
                    {data?.logs.map((log, index) => (
                        <div key={index} className="p-2">
                            {unixToDateTimeString(log.time)}: {log.log}
                        </div>
                    ))}
                </div>
                <Link to={"/log"} className="flex w-full justify-end mt-2">
                    <button className="font-semibold py-1 px-4 bg-black text-white rounded-full">
                        See more
                    </button>
                </Link>
            </section>
        </>
    );
};

export default MiniLog;
