import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

type Variant = 'default' | 'outline' | 'filled';
type InputType = 'text' | 'email' | 'password' | 'textarea'; // Extendable for more types

interface BaseProps {
    label?: string;
    name: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    variant?: Variant;
    className?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input: React.FC<InputProps & { type?: InputType }> = ({
    label,
    name,
    register,
    error,
    variant = 'default',
    className,
    type = 'text',
    ...props
}) => {
    const sharedClasses = clsx(
        'w-full p-2 rounded transition-all duration-200 focus:outline-none focus:ring-2',
        variant === 'default' && 'border border-gray-300 focus:ring-blue-500',
        variant === 'outline' && 'border-2 border-blue-500 focus:ring-blue-600',
        variant === 'filled' &&
            'bg-gray-100 border border-gray-300 focus:ring-blue-500',
        error && 'border-red-500 focus:ring-red-500',
        className
    );

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    {...register}
                    {...(props as TextareaProps)}
                    className={sharedClasses}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    {...register}
                    {...(props as InputProps)}
                    className={sharedClasses}
                />
            )}
            {error && <small className="text-red-700">{error.message}</small>}
        </div>
    );
};

export default Input;
