import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/gallery",
        element: <Gallery />,
    },
    {
        path: "/add-schedule",
        element: <AddSchedule />,
    },
    {
        path: "/change-schedule",
        element: <ChangeSchedule />,
    },
    {
        path: "/enviroment",
        element: <Environment />,
    },
    {
        path: "/log",
        element: <Log />,
    },
    {
        path: "/pet-status",
        element: <PetStatus />,
    },
    {
        path: "/device-status",
        element: <Status />,
    },
    {
        path: "/video-call",
        element: <VideoCall />,
    },
     {
        path: "/add-schedule",
        element: <AddSchedule />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FeederProvider>
            <RouterProvider router={router} />
        </FeederProvider>
    </React.StrictMode>
);
