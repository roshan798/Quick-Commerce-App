import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { PaginatedApiResponse, Product } from "../../types";
import { deleteProductById, getAllProducts } from "../../http/product";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import { Plus, Edit, Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(6);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [orderBy, setOrderBy] = useState<string>("createdAt");
    const [orderDir, setOrderDir] = useState<string>("desc");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<PaginatedApiResponse<Product[]>> = await getAllProducts(1, 1000, "createdAt", "desc");
                setOriginalProducts(response.data.data);
                setProducts(response.data.data);
                setTotalPages(Math.ceil(response.data.data.length / size));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [size]);

    useEffect(() => {
        const sortedProducts = [...originalProducts].sort((a, b) => {
            const valueA = a[orderBy as keyof Product];
            const valueB = b[orderBy as keyof Product];

            if (typeof valueA === "string" && typeof valueB === "string") {
                return orderDir === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
            if (typeof valueA === "number" && typeof valueB === "number") {
                return orderDir === "asc" ? valueA - valueB : valueB - valueA;
            }
            return 0;
        });
        setProducts(sortedProducts);
    }, [orderBy, orderDir, originalProducts]);

    const paginatedProducts = products.slice((page - 1) * size, page * size);

    const handleDelete = async (productId: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProductById(productId);
            setOriginalProducts((prev) => prev.filter((product) => product.productId !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-6xl mx-auto rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Manage Products</h2>
                    <Link to="/admin/add-product">
                        <Button variant="outline-primary" icon={<Plus size={20} />}>Add Product</Button>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="px-4 py-2 border rounded-md">
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created At</option>
                        <option value="updatedAt">Updated At</option>
                    </select>

                    <select value={orderDir} onChange={(e) => setOrderDir(e.target.value)} className="px-4 py-2 border rounded-md">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="px-4 py-2 border rounded-md">
                        <option value={6}>6 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center text-lg font-medium text-gray-600">Loading products...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full border rounded-md overflow-hidden">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr className="*:p-2 ">
                                        <th className="">Image</th>
                                        <th className="">Name</th>
                                        <th className="">Description</th>
                                        <th className="">Price</th>
                                        <th className="">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProducts.length > 0 ? (
                                        paginatedProducts.map((product) => (
                                            <tr key={product.productId} className="even:bg-gray-50 *:p-2  text-center hover:bg-gray-300 transition">
                                                <td>
                                                    {product.images && product.images.length > 0 ? (
                                                        <img src={`${BASE_URL}${product.images[0]}`} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                                                    ) : (
                                                        <span className="text-gray-500">No Image</span>
                                                    )}
                                                </td>
                                                <td>{product.name}</td>
                                                <td className="truncate max-w-xs">{product.description}</td>
                                                <td>₹{product.price.toFixed(2)}</td>
                                                <td>
                                                    <div className="flex justify-center gap-2">
                                                        <Link to={`/admin/add-or-update-product/${product.productId}`}>
                                                            <Button variant="primary" icon={<Edit size={16} />} />
                                                        </Link>
                                                        <Button variant="danger" onClick={() => handleDelete(product.productId)} icon={<Trash2 size={16} />} />
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
                        </div>

                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>Previous</button>
                            <span className="text-lg font-medium">Page {page} of {totalPages}</span>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition" onClick={() => setPage((prev) => prev + 1)} disabled={page === totalPages}>Next</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;