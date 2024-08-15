import React from "react";

const LoadingPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="loading loading-bars loading-lg"></div>
        </div>
    );
};

export default LoadingPage;
