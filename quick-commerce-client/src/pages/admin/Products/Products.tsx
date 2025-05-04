import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ProductsTable from './ProductsTable';
import { PaginatedApiResponse, Product } from '../../../types';
import { deleteProductById, getAllProducts } from '../../../http/product';
import Button from '../../../components/shared/Button';

const Products = () => {
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const [page, setPage] = useState<number>(1);
    const [page] = useState<number>(1);
    const [size] = useState<number>(6);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Product;
        direction: 'asc' | 'desc' | null;
    }>({
        key: 'createdAt',
        direction: 'desc',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<PaginatedApiResponse<Product[]>> =
                    await getAllProducts(1, 1000, 'createdAt', 'desc');
                setOriginalProducts(response.data.data);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (productId: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProductById(productId);
            setOriginalProducts((prev) =>
                prev.filter((product) => product.productId !== productId)
            );
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const sortProducts = (key: keyof Product) => {
        let direction: 'asc' | 'desc' | null = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null;
        }
        setSortConfig({ key, direction });

        if (!direction) {
            setProducts([...originalProducts]);
        } else {
            setProducts(
                [...products].sort((a, b) => {
                    if (a[key] != null && b[key] !== null && a[key] < b[key])
                        return direction === 'asc' ? -1 : 1;
                    if (a[key] != null && b[key] !== null && a[key] > b[key])
                        return direction === 'asc' ? 1 : -1;
                    return 0;
                })
            );
        }
    };

    const paginatedProducts = products.slice((page - 1) * size, page * size);

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Manage Products
                    </h2>
                    <Link to="/admin/products/add">
                        <Button
                            variant="outline-primary"
                            icon={<Plus size={20} />}
                        >
                            Add Product
                        </Button>
                    </Link>
                </div>
                <div>
                    {loading ? (
                        <div className="text-center text-lg font-medium text-gray-600">
                            Loading products...
                        </div>
                    ) : (
                        <ProductsTable
                            products={paginatedProducts}
                            sortProducts={sortProducts}
                            handleDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
