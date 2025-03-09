import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { PaginatedApiResponse, Product } from "../../types";
import { getAllProducts } from "../../http/product";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import { Plus } from "lucide-react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
    console.log("DASHBOARD");
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(6);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<PaginatedApiResponse<Product[]>> = await getAllProducts(page, size);
                setProducts(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, size]);

    const handleDelete = async (productId: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            // implement delete function
            setProducts((prev) => prev.filter((product) => product.productId !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-semibold text-center mb-8">Admin Dashboard</h2>

                {/* Page Size Selector */}
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium">Manage Products</h3>
                    <div className="flex items-center gap-4">
                        <Link to="/admin/add-product" className="relative">
                            <Button variant="outline-primary" icon={<Plus size={20} />}>
                                Add Product
                            </Button>
                        </Link>
                        <div className="flex items-center">
                            <label className="mr-2 font-medium">Products per page:</label>
                            <select
                                value={size}
                                onChange={(e) => {
                                    setSize(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="border rounded px-2 py-1 cursor-pointer"
                            >
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="15">15</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                    </div>
                </div>


                {loading ? (
                    <div className="text-center text-lg font-semibold">Loading products...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product.productId} className="bg-white p-4 shadow rounded-lg">
                                        {/* Product Image */}
                                        {product.images.length > 0 ? (
                                            <img
                                                src={BASE_URL + product.images[0]} // Display the first image
                                                alt={product.name}
                                                className="w-full h-40 object-contain rounded-lg mb-2"
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                                                <span className="text-gray-500">No Image Available</span>
                                            </div>
                                        )}

                                        {/* Product Details */}
                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                        <p className="text-gray-500 text-sm">{product.description || "No description available."}</p>
                                        <p className="text-gray-700 font-semibold mt-1">₹{product.price.toFixed(2)}</p>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="primary">Edit</Button>
                                            <Button variant="danger" onClick={() => handleDelete(product.productId)}>Delete</Button>
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">No products available.</p>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
                                onClick={() => setPage((prev) => prev - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            <span className="text-lg font-medium">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
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

export default Dashboard;