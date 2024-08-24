import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import VideoCall from "./VideoCall.tsx";
import MainPage from "./MainPage.tsx";
import Gallery from "./Gallery.tsx";
import ChangeSchedule from "./ChangeSchedule.tsx";
import Environment from "./Environment.tsx";
import Log from "./Log.tsx";
import PetStatus from "./PetStatus.tsx";
import Status from "./Status.tsx";
import ErrorPage from "./ErrorPage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SettingsProvider } from "./SettingsContext.tsx";
import Settings from "./Settings.tsx";

export const App = () => (
    <ErrorBoundary
        fallbackRender={({ error }) => (
            <ErrorPage
                error={error.message || "An unexpected error occurred"}
            />
        )}
    >
        <SettingsProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route
                        path="/change-schedule"
                        element={<ChangeSchedule />}
                    />
                    <Route path="/environment" element={<Environment />} />
                    <Route path="/log" element={<Log />} />
                    <Route path="/pet-status" element={<PetStatus />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/video-call" element={<VideoCall />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-right" // Position of the toast
                autoClose={3000} // Duration of toast visibility
                hideProgressBar={true} // Show progress bar
                closeOnClick
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            ></ToastContainer>
        </SettingsProvider>
    </ErrorBoundary>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React>
    <App />
    // </React>
);
