import React from "react";
import { useNavigate } from "react-router-dom";

const Error404: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-8xl font-bold text-gray-800 dark:text-gray-200">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mt-4">
                Oops! Page not found.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                It looks like you took a wrong turn. Let's get you back home.
            </p>
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Go to Home
            </button>
        </div>
    );
};

export default Error404;
