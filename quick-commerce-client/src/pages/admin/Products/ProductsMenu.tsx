import { Link } from 'react-router-dom';
import { MoreVertical, Edit, Trash2, Image } from 'lucide-react';

interface ProductMenuProps {
    productId: number;
    onDelete: () => void;
    open: number | null;
    toggleMenu: (productId: number) => void;
}

const ProductMenu = ({
    productId,
    onDelete,
    open,
    toggleMenu,
}: ProductMenuProps) => {
    return (
        <div className="relative">
            <button
                onClick={() => toggleMenu(productId)}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
            >
                <MoreVertical size={20} />
            </button>
            {open === productId && (
                <div className="absolute *:text-nowrap z-20 right-20 mt-2 max-w-60 bg-white border shadow-md rounded-md p-2 flex flex-col">
                    <Link
                        to={`/admin/products/update/${productId}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    >
                        <Edit size={16} />
                        Edit Product
                    </Link>
                    <Link
                        to={`/admin/products/images/${productId}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    >
                        <Image size={16} />
                        Manage Images
                    </Link>
                    <button
                        onClick={onDelete}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-red-500"
                    >
                        <Trash2 size={16} /> Delete Product
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductMenu;
