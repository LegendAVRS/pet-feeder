import React from "react";

interface ErrorPageProps {
    error: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex gap-2 text-xl">
                <h1 className="font-bold">Error</h1>
                <span>|</span>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default ErrorPage;
