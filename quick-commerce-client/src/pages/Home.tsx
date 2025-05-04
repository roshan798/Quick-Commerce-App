import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { getAllProducts } from '../http/product';
import { PaginatedApiResponse, Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(6);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<PaginatedApiResponse<Product[]>> =
                    await getAllProducts(page, size);
                setProducts(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, size]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Featured Products
                </h2>

                {/* Page Size Selector */}
                <div className="flex justify-end mb-4">
                    <label className="mr-2 font-medium">
                        Products per page:
                    </label>
                    <select
                        value={size}
                        onChange={(e) => {
                            setSize(Number(e.target.value));
                            setPage(1); // Reset to first page when size changes
                        }}
                        className="border rounded px-2 py-1"
                    >
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="15">15</option>
                    </select>
                </div>
                {loading ? (
                    <div className="text-center text-lg font-semibold">
                        Loading products...
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product.productId}
                                        product={product}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">
                                    No products available.
                                </p>
                            )}
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                                onClick={() => setPage((prev) => prev - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            <span className="text-lg font-medium">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
