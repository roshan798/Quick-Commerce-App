import React from "react";
import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "danger";
    className?: string;
    icon?: React.ReactNode; 
    iconPosition?: "left" | "right"; 
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    className,
    icon,
    iconPosition = "left",
    ...props
}) => {
    const baseStyles =
        "cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1";

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border bg-white border-gray-500 text-gray-700 hover:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button className={clsx(baseStyles, variantStyles[variant], className)} {...props}>
            {icon && iconPosition === "left" && <span>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span>{icon}</span>}
        </button>
    );
};

export default Button;
