import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { getProductById } from "../../http/product";
import { ApiResponse, Product } from "../../types";


const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    price: z.number().positive("Price must be positive"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    stock: z.number().int().min(1, "Stock must be at least 1"),
});

type ProductFormData = z.infer<typeof productSchema>;

const AddOrUpdateProduct = () => {
    const { productId  }= useParams(); 
    // console.log("product id : ", productId)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                setLoading(true);
                try {
                    const response = await getProductById(parseInt(productId));
                    const data: ApiResponse<Product> = response.data;
                    
                    if (data && data.data) {
                        setValue("name", data.data.name);
                        setValue("price", data.data.price);
                        setValue("description", data.data.description);
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProduct();
    }, [productId, setValue]);
    

    const onSubmit = async (data: ProductFormData) => {
        try {
            if (productId) {
                await axios.put(`/api/products/${productId}`, data);
                alert("Product updated successfully!");
            } else {
                await axios.post("/api/products", data);
                alert("Product created successfully!");
            }
            navigate("/admin/products");
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading product details...</p>;

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
                {productId ? "Update Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Price ($)</label>
                    <input
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border rounded"
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Stock</label>
                    <input
                        type="number"
                        {...register("stock", { valueAsNumber: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {productId ? "Update Product" : "Create Product"}
                </button>
            </form>
        </div>
    );
};

export default AddOrUpdateProduct;
