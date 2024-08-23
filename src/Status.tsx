import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { DEVICE_URL, RESTART_URL } from "./utils/global";
import MiniLog from "./MiniLog";
import LoadingPage from "./LoadingPage";
import { postRequest } from "./utils/helpers";
import { toast } from "react-toastify";

const Status = () => {
    const { data, error } = useData<any>(DEVICE_URL);

    if (error) {
        throw new Error(error);
    }
    if (!data) {
        return <LoadingPage></LoadingPage>;
    }

    const handleRestart = async () => {
        try {
            await postRequest(1, RESTART_URL);
            toast.success("Success: Restarting device");
        } catch (error) {
            toast.error("Error: Failed to restart device");
        }
    };

    return (
        <>
            <NavBar label="Device Status"></NavBar>
            <section className="px-6">
                <div className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex items-center justify-between">
                        <p>Restart device</p>
                        <button
                            className="font-semibold py-1 px-4 bg-black text-white rounded-full"
                            onClick={handleRestart}
                        >
                            Restart now
                        </button>
                    </div>
                </div>
                <div className="h-4"></div>
                <div className="p-4 rounded-2xl border border-slate-300">
                    <h3 className=" font-bold text-2xl">Device information</h3>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Software version</p>
                    <p className="text-md font-medium">{data?.software}</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">IP address</p>
                    <p className="text-md font-medium">{data?.ip}</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Chip</p>
                    <p className="text-md font-medium">{data?.chip}</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Chip Spec</p>
                    <p className="text-md font-medium">{data?.core} Core(s) @ {data?.cpu_freq_mhz}MHz</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Free ram</p>
                    <p className="text-md font-medium">{data?.free_heap} byte</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Wifi</p>
                    <p className="text-md font-medium">{data?.wifi}</p>
                    <div className="h-1"></div>
                </div>
            </section>
            <MiniLog></MiniLog>
        </>
    );
};

export default Status;
