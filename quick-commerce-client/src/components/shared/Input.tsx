import React from "react";
import clsx from "clsx";

type InputProps = {
    variant?: "default" | "error" | "success";
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ variant = "default", className, ...props }) => {
    const baseStyles = "w-full px-4 py-2 rounded border outline-none transition-all duration-200";

    const variantStyles = {
        default: "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        error: "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500",
        success: "border-green-500 focus:border-green-600 focus:ring-1 focus:ring-green-500",
    };

    return (
        <input
            className={clsx(baseStyles, variantStyles[variant], className)}
            {...props}
        />
    );
};

export default Input;
