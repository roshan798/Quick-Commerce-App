import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addProduct } from '../../http/product';
import { Input } from '../../components/shared/Input';
import { useNavigate } from 'react-router-dom';

const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    price: z.coerce.number().positive('Price must be positive'),
    description: z
        .string()
        .min(10, 'Product description must be at least 10 characters'),
});

type ProductFormData = z.infer<typeof productSchema>;

const AddProduct = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        try {
            await addProduct(data);
            alert('Product created successfully!');
            navigate('/admin/products');
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="p-6 flex justify-center items-center min-h-screen">
            <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md h-min">
                <div className="mb-8 title">
                    <h2 className="text-center text-2xl font-semibold mb-4">
                        Add New Product
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
                        className="w-full bg-blue-600 hover:bg-blue-800 transition-colors cursor-pointer text-white px-4 py-2 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
