import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { PaginatedApiResponse, Product } from "../../types";
import { getAllProducts } from "../../http/product";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import { Plus, Edit, Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
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
            setProducts((prev) => prev.filter((product) => product.productId !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto bg-white p-6 shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Products</h2>
                    <Link to="/admin/add-product">
                        <Button variant="outline-primary" icon={<Plus size={20} />}>Add Product</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center text-lg font-semibold">Loading products...</div>
                ) : (
                    <>
                        <table className="min-w-full bg-white border border-gray-200 rounded">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border">Image</th>
                                    <th className="p-3 border">Name</th>
                                    <th className="p-3 border">Price</th>
                                    <th className="p-3 border">Stock</th>
                                    <th className="p-3 border">Category</th>
                                    <th className="p-3 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.productId} className=" *:p-2 *:border text-center border-b">
                                            <td className="">
                                                {product.images.length > 0 ? (
                                                    <img src={`${BASE_URL}${product.images[0]}`} alt={product.name} className="h-16 w-16 object-cover" />
                                                ) : (
                                                    <span className="text-gray-500">No Image</span>
                                                )}
                                            </td>
                                            <td className="">{product.name}</td>
                                            <td className="">₹{product.price.toFixed(2)}</td>
                                            {/* <td className="p-3 border">{product?.stock}</td> */}
                                            <td className="">{""}</td>
                                            {/* <td className="p-3 border">{product?.category}</td> */}
                                            <td className="">{""}</td>
                                            <td className="">
                                                <div className="flex justify-center gap-1.5">
                                                    <Button variant="primary"  icon={<Edit size={16} />}/>
                                                    <Button variant="danger" onClick={() => handleDelete(product.productId)} icon={<Trash2 size={16} />}/>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center p-4 text-gray-500">No products available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
                                onClick={() => setPage((prev) => prev - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            <span className="text-lg font-medium">Page {page} of {totalPages}</span>
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

export default Products;