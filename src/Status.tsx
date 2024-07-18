import NavBar from "./NavBar";

const Status = () => {
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
                    <p className="text-md font-medium">0.0.1-alpha</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">IP address</p>
                    <p className="text-md font-medium">127.0.0.1</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Up time</p>
                    <p className="text-md font-medium">17:17:17</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Board</p>
                    <p className="text-md font-medium">Arduino Uno</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Wifi</p>
                    <p className="text-md font-medium">HCMUS-Public</p>
                    <div className="h-1"></div>
                    <p className="text-lg font-medium">Wifi hardware</p>
                    <p className="text-md font-medium">ESP</p>
                </div>
                <div className="h-4"></div>
                <section className="p-4 rounded-2xl border border-slate-300">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-2xl">Device's log</p>
                        <a href="./device-log.html" className="text-2xl">
                            →
                        </a>
                    </div>
                    <div className="h-4"></div>
                    <div className="p-4 rounded-md bg-gray-300">
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                        <code>A whole bunch of logs</code>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Status;
