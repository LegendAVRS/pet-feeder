import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage.tsx";
import Gallery from "./Gallery.tsx";
import AddSchedule from "./AddSchedule.tsx";
import ChangeSchedule from "./ChangeSchedule.tsx";
import Environment from "./Environment.tsx";
import Log from "./Log.tsx";
import PetStatus from "./PetStatus.tsx";
import Status from "./Status.tsx";
import VideoCall from "./VideoCall.tsx";
import { FeederProvider } from "./context/FeederContext.tsx";

const App = () => (
    <FeederProvider>
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/add-schedule" element={<AddSchedule />} />
                <Route path="/change-schedule" element={<ChangeSchedule />} />
                <Route path="/environment" element={<Environment />} />
                <Route path="/log" element={<Log />} />
                <Route path="/pet-status" element={<PetStatus />} />
                <Route path="/device-status" element={<Status />} />
                <Route path="/video-call" element={<VideoCall />} />
                <Route path="/add-schedule" element={<AddSchedule />} />
            </Routes>
        </Router>
    </FeederProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
