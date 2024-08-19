import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { LogsData } from "./utils/types";
import { LOG_URL } from "./utils/global";
import LoadingPage from "./LoadingPage";

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
                <div className="p-4 rounded-md bg-gray-300 h-[80vh] max-h-[80vh] overflow-x-auto overflow-y-scroll">
                    {data?.logs?.map((log, index) => (
                        <div key={index} className="p-2">
                            {log.time}: {log.log}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Log;
