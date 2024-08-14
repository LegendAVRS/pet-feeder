import useData from "./hooks/useData";
import { LOG_URL, LogData } from "./utils/types";

const MiniLog = () => {
    const { data } = useData<LogData>(LOG_URL);
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <section className="px-6">
                <div className="p-4 rounded-md bg-gray-300">
                    {data?.logs.map((log, index) => (
                        <div key={index} className="p-2">
                            {log}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default MiniLog;
