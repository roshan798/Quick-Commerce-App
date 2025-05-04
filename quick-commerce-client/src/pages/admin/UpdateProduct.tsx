import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProductById } from '../../http/product';
import { Input } from '../../components/shared/Input';
import { ApiResponse, Product } from '../../types';

const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    price: z.coerce.number().positive('Price must be positive'),
    description: z
        .string()
        .min(10, 'Product description must be at least 10 characters'),
});

type ProductFormData = z.infer<typeof productSchema>;

const UpdateProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                const response = await getProductById(parseInt(productId));
                const data: ApiResponse<Product> = response.data;
                if (data?.data) {
                    reset({
                        name: data.data.name,
                        price: data.data.price,
                        description: data.data.description,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
                alert('Failed to fetch product details. Please try again.');
                navigate('/admin/products');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, reset, navigate]);

    const onSubmit = async (data: ProductFormData) => {
        try {
            if (!productId) return;
            await updateProductById(parseInt(productId), data);
            alert('Product updated successfully!');
            navigate('/admin/products');
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 flex justify-center items-center min-h-screen">
            <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md h-min">
                <div className="mb-8 title">
                    <h2 className="text-center text-2xl font-semibold mb-4">
                        Update Product
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                >
                    <Input
                        name="name"
                        placeholder="Product Name"
                        register={register('name', {
                            required: 'Product Name is required',
                        })}
                        error={errors.name}
                        variant="default"
                    />
                    <Input
                        name="price"
                        placeholder="Price"
                        register={register('price', {
                            required: 'Price must be specified',
                        })}
                        error={errors.price}
                        variant="default"
                    />
                    <Input
                        type="textarea"
                        name="description"
                        placeholder="Product Description"
                        register={register('description', {
                            required: 'Product Description is required',
                        })}
                        error={errors.description}
                        variant="default"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-800 transition-colors cursor-pointer text-white px-4 py-2 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
