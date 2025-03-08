import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { addProductToCart, removeProductFromCart } from "../store/cart.slice";
import { Product } from "../types";

type ProductCartProps = {
    product: Product;
};


const ProductCard = ({ product }: ProductCartProps) => {
    const dispatch = useAppDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);

    const cartItem = cart?.cartItems?.find(item => item.productId === product.productId);

    const handleIncrease = async () => {
        try {
            dispatch(addProductToCart(product.productId))
        } catch (error) {
            console.error("Error updating quantity:", error);
        }

    };

    const handleDecrease = () => {
        if (cartItem) {
            try {
                dispatch(removeProductFromCart(product.productId));
            } catch (error) {
                console.error("Error removing quantity:", error);
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg text-blue-600 font-bold">${product.price}</p>

            {cartItem ? (
                <div className="flex items-center justify-center mt-3">
                    <button onClick={handleDecrease} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">-</button>
                    <span className="mx-3 text-lg font-semibold">{cartItem.quantity}</span>
                    <button onClick={handleIncrease} className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">+</button>
                </div>
            ) : (
                <button onClick={handleIncrease} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Add to Cart
                </button>
            )}
        </div>
    );
};

export default ProductCard;