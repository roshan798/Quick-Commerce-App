import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { signup } from '../../http/auth';
import { ApiResponse, User } from '../../types';

const signupSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    console.log(error, success);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

    const handleFormSubmit = async (data: SignupFormData) => {
        try {
            const response: AxiosResponse = await signup(data);
            const responseData: ApiResponse<User> = response.data;
            console.log('Signup Data:', data);
            if (responseData.success) {
                navigate('/login');
                setSuccess(true);
                setError(null);
            }
        } catch (error) {
            console.log(error);
        }
        // finally {

        // }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md my-6">
                <div className="text-5xl font-bold text-center text-blue-500 mb-4 px-6 pt-3 pb-2">
                    <h2>Signup</h2>
                </div>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4 p-6"
                >
                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <Input
                            name="name"
                            placeholder="Name"
                            register={register('name')}
                            error={errors.name}
                            variant="default"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <Input
                            name="email"
                            placeholder="john@doe.com"
                            register={register('email')}
                            error={errors.email}
                            variant="default"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="********"
                            register={register('password')}
                            error={errors.password}
                            variant="default"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="********"
                            register={register('confirmPassword')}
                            error={errors.confirmPassword}
                            variant="default"
                        />
                    </div>

                    {/* Signup Button */}
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                    >
                        Signup
                    </Button>
                </form>

                <div className="text-sm p-4 text-center">
                    Already have an account?{' '}
                    <Link
                        className="text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                        to="/login"
                    >
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
