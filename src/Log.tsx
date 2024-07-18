import NavBar from "./NavBar";

const Log = () => {
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
        </>
    );
};

export default Log;
