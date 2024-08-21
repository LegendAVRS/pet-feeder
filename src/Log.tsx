import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { LogsData } from "./utils/types";
import { LOG_URL } from "./utils/global";
import LoadingPage from "./LoadingPage";
import { unixToDateTimeString } from "./utils/helpers";

const Log = () => {
    const { data, error } = useData<LogsData>(LOG_URL);
    if (error) {
        throw new Error(error);
    }

    if (!data) {
        return <LoadingPage />;
    }
    return (
        <>
            <NavBar label="Device Log"></NavBar>
            <section className="px-6">
                <div className="flex flex-col p-4 rounded-md bg-gray-300 h-[80vh] max-h-[80vh] overflow-x-scroll overflow-y-scroll">
                    {data?.logs?.map((log, index) => (
                        <code key={index} className="p-2 w-max">
                            [{unixToDateTimeString(log.time)}] {log.log}
                        </code>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Log;
