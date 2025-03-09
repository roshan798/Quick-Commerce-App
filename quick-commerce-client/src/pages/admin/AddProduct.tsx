import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProduct } from "../../http/product";
import { AxiosError, AxiosResponse } from "axios";

// Define validation schema
const productSchema = z.object({
    productId: z.number().default(0),
    name: z.string().min(2, "Product name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be greater than zero"),
    // imageUrl: z.string().url("Invalid image URL").optional(),
    updatedAt: z.string(),
    createdAt: z.string(),
});


// Type inference from schema
type ProductFormData = z.infer<typeof productSchema>;

const AddProduct = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const handleFormSubmit = async (productData: ProductFormData) => {
        setLoading(true);
        try {
            const response: AxiosResponse = await addProduct(productData);
            console.log("Product added:", response.data);
        } catch (e: unknown) {
            const error = e as AxiosError;
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md">
                <div className="text-5xl font-bold text-center text-blue-500 mb-4 px-6 pt-3 pb-2">
                    <h2>Add Product</h2>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 p-6">
                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</label>
                        <Input {...register("name")} type="text" id="name" placeholder="Enter product name" />
                        {errors.name && <small className="text-sm text-red-600">{errors.name.message}</small>}
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                        <Input {...register("description")} type="text" id="description" placeholder="Enter product description" />
                        {errors.description && <small className="text-sm text-red-600">{errors.description.message}</small>}
                    </div>

                    {/* Price Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
                        <Input {...register("price", { valueAsNumber: true })} type="number" id="price" placeholder="Enter price" />
                        {errors.price && <small className="text-sm text-red-600">{errors.price.message}</small>}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                        {loading ? "Adding..." : "Add Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
