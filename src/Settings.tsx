import { BellAlertIcon, ScaleIcon, SunIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import { useSettings } from "./SettingsContext";

const Settings = () => {
    const {
        allowNoti,
        setAllowNoti,
        inFahrenheit,
        setInFahrenheit,
        inOunce,
        setInOunce,
    } = useSettings();

    const handleChange = () => {
        if (allowNoti) {
            setAllowNoti(false);
        } else {
            if (Notification.permission === "denied") {
                alert(
                    "Notifications are blocked. Please enable notifications in your browser settings."
                );
            } else if (Notification.permission === "default") {
                // Ask browser for permission
                Notification.requestPermission().then((result) => {
                    if (result === "granted") {
                        setAllowNoti(true);
                    } else if (result === "denied") {
                        alert(
                            "Notifications are blocked. Please enable notifications in your browser settings."
                        );
                    }
                });
            } else if (Notification.permission === "granted") {
                setAllowNoti(true);
            }
        }
    };

    return (
        <div>
            <NavBar label="Settings"></NavBar>
            <div className="flex flex-col">
                <div className="flex justify-between px-4">
                    <label
                        htmlFor="noti"
                        className="font-bold text-lg flex items-center gap-2"
                    >
                        <BellAlertIcon width={30}></BellAlertIcon>
                        Allow notifications
                    </label>
                    <input
                        id="noti"
                        type="checkbox"
                        className="toggle"
                        checked={allowNoti}
                        onChange={() => handleChange()}
                    />
                </div>
                <div className="flex justify-between px-4">
                    <label
                        htmlFor="fa"
                        className="font-bold text-lg flex items-center gap-2"
                    >
                        <SunIcon width={30}></SunIcon>
                        In Fahrenheit
                    </label>
                    <input
                        id="fa"
                        type="checkbox"
                        className="toggle"
                        checked={inFahrenheit}
                        onChange={() => setInFahrenheit(!inFahrenheit)}
                    />
                </div>
                <div className="flex justify-between px-4">
                    <label
                        htmlFor="oz"
                        className="font-bold text-lg flex items-center gap-2"
                    >
                        <ScaleIcon width={30}></ScaleIcon>
                        In Ounce
                    </label>
                    <input
                        id="oz"
                        type="checkbox"
                        className="toggle"
                        checked={inOunce}
                        onChange={() => setInOunce(!inOunce)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
