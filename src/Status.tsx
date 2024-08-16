import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { DevData, DEVICE_URL } from "./utils/types";
import MiniLog from "./MiniLog";
import LoadingPage from "./LoadingPage";

const Status = () => {
    const { data, error } = useData<DevData>(DEVICE_URL);

    if (error) {
        throw new Error(error);
    }
    if (!data) {
        return <LoadingPage></LoadingPage>;
    }
    return (
        <>
            <NavBar label="Device Status"></NavBar>
            <section className="px-6">
                <div className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex items-center justify-between">
                        <p>Restart device</p>
                        <button className="font-semibold py-1 px-4 bg-black text-white rounded-full">
                            Restart now
                        </button>
                    </div>
                </div>
                <div className="h-4"></div>
                <div className="p-4 rounded-2xl border border-slate-300">
                    <h3 className=" font-bold text-2xl">Device information</h3>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Software version</p>
                    <p className="text-md font-medium">{data.software}</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">IP address</p>
                    <p className="text-md font-medium">{data.ip}</p>
                    <div className="h-1"></div>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Board</p>
                    <p className="text-md font-medium">{data.board}</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Wifi</p>
                    <p className="text-md font-medium">{data.wifi}</p>
                    <div className="h-1"></div>
                </div>
            </section>
            <MiniLog></MiniLog>
        </>
    );
};

export default Status;
