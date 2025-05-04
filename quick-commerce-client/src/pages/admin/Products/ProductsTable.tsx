import { ArrowUpDown } from 'lucide-react';
import { Product } from '../../../types';
import ProductRow from './ProductsRow';
import { useState } from 'react';

interface ProductsTableProps {
    products: Product[];
    sortProducts: (key: keyof Product) => void;
    handleDelete: (productId: number) => void;
}

const ProductsTable = ({
    products,
    sortProducts,
    handleDelete,
}: ProductsTableProps) => {
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const toggleMenu = (productId: number) => {
        setMenuOpen((prev) => (prev === productId ? null : productId));
    };

    return (
        <table className="w-full rounded-md">
            <thead className="bg-gray-700 text-gray-200">
                <tr className="*:p-2 border text-left">
                    <th>Image</th>
                    <th
                        className="cursor-pointer flex items-center justify-start gap-2"
                        onClick={() => sortProducts('name')}
                    >
                        Name <ArrowUpDown size={14} />
                    </th>
                    <th>Description</th>
                    <th
                        className="cursor-pointer flex items-center justify-start gap-2"
                        onClick={() => sortProducts('price')}
                    >
                        Price <ArrowUpDown size={14} />
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductRow
                            key={product.productId}
                            product={product}
                            onDelete={() => handleDelete(product.productId)}
                            open={menuOpen}
                            toggleMenu={toggleMenu}
                        />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={5}
                            className="text-center p-4 text-gray-500"
                        >
                            No products available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ProductsTable;
