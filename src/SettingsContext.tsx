import React, { createContext, useContext, useState, useEffect } from "react";

// Define the context interface
interface SettingsContextProps {
    allowNoti: boolean;
    setAllowNoti: (value: boolean) => void;
    inFahrenheit: boolean;
    setInFahrenheit: (value: boolean) => void;
    inOunce: boolean;
    setInOunce: (value: boolean) => void;
}

// Create the context with default values
const SettingsContext = createContext<SettingsContextProps>({
    allowNoti: false,
    setAllowNoti: () => {},
    inFahrenheit: false,
    setInFahrenheit: () => {},
    inOunce: false,
    setInOunce: () => {},
});

// Provider component to wrap around your app
interface SettingsProviderProps {
    children: React.ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
    const [allowNoti, setAllowNoti] = useState<boolean>(() => {
        const storedValue = localStorage.getItem("allowNoti");
        return storedValue === "true";
    });

    const [inFahrenheit, setInFahrenheit] = useState<boolean>(() => {
        const storedValue = localStorage.getItem("inFahrenheit");
        return storedValue === "true";
    });

    const [inOunce, setInOunce] = useState<boolean>(() => {
        const storedValue = localStorage.getItem("inOunce");
        return storedValue === "true";
    });

    useEffect(() => {
        localStorage.setItem("allowNoti", allowNoti.toString());
    }, [allowNoti]);

    useEffect(() => {
        localStorage.setItem("inFahrenheit", inFahrenheit.toString());
    }, [inFahrenheit]);

    useEffect(() => {
        localStorage.setItem("inOunce", inOunce.toString());
    }, [inOunce]);

    return (
        <SettingsContext.Provider
            value={{
                allowNoti,
                setAllowNoti,
                inFahrenheit,
                setInFahrenheit,
                inOunce,
                setInOunce,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

// Custom hook to use the SettingsContext
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
