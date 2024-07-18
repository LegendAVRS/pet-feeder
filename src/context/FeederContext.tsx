import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { FeederData, getDummyData } from "../utils/types";

// Define the shape of the context state
interface FeederContextState {
    // Add your state properties here
    data: FeederData;
    setData: (data: FeederData) => void;
}

// Create the context with a default value
const FeederContext = createContext<FeederContextState | undefined>(undefined);

// Create a custom hook for using the context
export const useFeederContext = () => {
    const context = useContext(FeederContext);
    if (!context) {
        throw new Error(
            "useFeederContext must be used within a FeederProvider"
        );
    }
    return context;
};

// Define the provider component
interface FeederProviderProps {
    children: ReactNode;
}

export const FeederProvider: React.FC<FeederProviderProps> = ({ children }) => {
    const [data, setData] = useState<FeederData>(getDummyData());

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("")
    //             const result = await response.json();
    //             setData(result);
    //         }
    //         catch(e) {
    //             console.log(e)
    //         }
    //     }
    //     fetchData();
    // }, [])

    return (
        <FeederContext.Provider value={{ data, setData }}>
            {children}
        </FeederContext.Provider>
    );
};
