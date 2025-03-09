import React from "react";
import clsx from "clsx";

type Variant =
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "success"
    | "warning"
    | `outline-${"primary" | "secondary" | "danger" | "success" | "warning"}`;

type ButtonProps = {
    children: React.ReactNode;
    variant?: Variant;
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
        "cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1 border";

    const variantStyles: Record<Variant, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 border-transparent",
        danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
        success: "bg-green-600 text-white hover:bg-green-700 border-transparent",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 border-transparent",
        outline: "bg-white border-gray-500 text-gray-700 hover:bg-gray-100",
        "outline-primary": "border-blue-600 text-blue-600 hover:bg-blue-100",
        "outline-secondary": "border-gray-600 text-gray-600 hover:bg-gray-100",
        "outline-danger": "border-red-600 text-red-600 hover:bg-red-100",
        "outline-success": "border-green-600 text-green-600 hover:bg-green-100",
        "outline-warning": "border-yellow-500 text-yellow-600 hover:bg-yellow-100",
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
