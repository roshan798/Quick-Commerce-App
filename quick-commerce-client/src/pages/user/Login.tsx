import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "../../http/auth"
import { LoginRequest } from "../../types/auth";
import { AxiosError, AxiosResponse } from "axios";
import { setUser } from "../../store/user.slice";
import { useDispatch } from 'react-redux'


// Define the validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type inference from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const dispatch = useDispatch()
    // const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    console.log("loading", loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // const getCart = async () => {
    //     try {
    //         const response: AxiosResponse = await getUserCart();
    //         const data: ApiResponse<Cart> = response.data;
    //         console.log("fetched Cart data", data.data);

    //     } catch (error) {
    //         console.error(error);

    //     }
    // }
    const handleFormSubmit = async (loginData: LoginFormData) => {
        console.log(loginData);

        try {
            const response: AxiosResponse = await login(loginData as LoginRequest);
            console.log("response", response);
            const { data: user } = response.data;
            console.log("user :", user);
            dispatch(setUser(user));
            // getCart();

        }
        catch (e: unknown) {
            const error = e as AxiosError;
            console.log(error);


        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md">
                <div className="text-5xl font-bold text-center text-blue-500 mb-4 px-6 pt-3 pb-2">
                    <h2>Login</h2>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 p-6">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <Input {...register("email")} type="email" id="email" name="email" placeholder="john@doe.com" />
                        {errors.email && <small className="text-sm text-red-600">{errors.email.message}</small>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <Input {...register("password")} type="password" id="password" name="password" placeholder="********" />
                        {errors.password && <small className="text-sm text-red-600">{errors.password.message}</small>}
                    </div>

                    {/* Login Button */}
                    <Button type="submit" className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                        Login
                    </Button>
                </form>

                <div className="text-sm p-4 text-center">
                    Don't have an account?{" "}
                    <Link className="text-blue-600 hover:text-blue-800 transition-colors hover:underline" to="/signup">
                        Signup now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
