import React from 'react';
import clsx from 'clsx';

type Variant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'danger'
    | 'success'
    | 'warning'
    | `outline-${'primary' | 'secondary' | 'danger' | 'success' | 'warning'}`;

type ButtonProps = {
    children?: React.ReactNode;
    variant?: Variant;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    circular?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className,
    icon,
    iconPosition = 'left',
    disabled,
    circular = false,
    ...props
}) => {
    const baseStyles =
        'cursor-pointer font-medium transition-all duration-200 flex items-center justify-center gap-1 border';

    const paddingStyles = circular ? 'p-2' : 'px-2 py-1';
    const borderRadius = circular ? 'rounded-full' : 'rounded-lg';
    const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

    const variantStyles: Record<Variant, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
        secondary:
            'bg-gray-600 text-white hover:bg-gray-700 border-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
        success:
            'bg-green-600 text-white hover:bg-green-700 border-transparent',
        warning:
            'bg-yellow-500 text-white hover:bg-yellow-600 border-transparent',
        outline: 'bg-white border-gray-500 text-gray-700 hover:bg-gray-100',
        'outline-primary':
            'border-blue-600 text-blue-600  bg-blue-500/20 hover:text-white hover:bg-blue-500',
        'outline-secondary':
            'border-gray-600 text-gray-600  bg-gray-500/20 hover:text-white hover:bg-gray-500',
        'outline-danger':
            'border-red-600 text-red-600  bg-red-500/20 hover:text-white hover:bg-red-500',
        'outline-success':
            'border-green-600 text-green-600  bg-green-500/20 hover:text-white hover:bg-green-500',
        'outline-warning':
            'border-yellow-500 text-yellow-600  bg-yellow-500/20 hover:text-white hover:bg-yellow-500',
    };

    return (
        <button
            className={clsx(
                baseStyles,
                paddingStyles,
                borderRadius,
                variantStyles[variant],
                disabled && disabledStyles,
                className
            )}
            disabled={disabled}
            {...props}
        >
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'right' && <span>{icon}</span>}
        </button>
    );
};

export default Button;
