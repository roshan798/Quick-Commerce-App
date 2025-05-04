import Carousel from '../../../components/shared/Carousel';
import { Product } from '../../../types';
import ProductMenu from './ProductsMenu';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductRowProps {
    product: Product;
    onDelete: () => void;
    open: number | null;
    toggleMenu: (productId: number) => void;
}

const ProductRow = ({
    product,
    onDelete,
    open,
    toggleMenu,
}: ProductRowProps) => {
    return (
        <tr className="even:bg-gray-50 *:p-2 text-left hover:bg-gray-300 transition">
            <td className="max-w-40 min-w-32">
                {product.images?.length ? (
                    <Carousel
                        className="w-full max-w-[500px] aspect-square rounded-sm"
                        images={product.images.map((url) => {
                            return BASE_URL + url;
                        })}
                        size="small"
                    />
                ) : (
                    <span className="text-gray-500">No Image</span>
                )}
            </td>
            <td>{product.name}</td>
            <td className="truncate max-w-xs">{product.description}</td>
            <td>₹{product.price.toFixed(2)}</td>
            <td>
                <ProductMenu
                    productId={product.productId}
                    onDelete={onDelete}
                    open={open}
                    toggleMenu={toggleMenu}
                />
            </td>
        </tr>
    );
};

export default ProductRow;
