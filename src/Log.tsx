import { ErrorBoundary } from "react-error-boundary";
import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { LOG_URL, LogData } from "./utils/types";

const Log = () => {
    const { data } = useData<LogData>(LOG_URL);
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <NavBar label="Log"></NavBar>
            <nav className="h-20 p-6 flex items-center">
                <button
                    onClick={() => {
                        window.history.back();
                    }}
                    className="pr-4 text-xl"
                >
                    &lt;
                </button>
                <h1 className=" font-bold text-3xl">Device's log</h1>
            </nav>
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

export default Log;
