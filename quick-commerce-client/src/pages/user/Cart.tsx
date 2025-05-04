import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
} from '../../store/cart.slice';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import Carousel from '../../components/shared/Carousel';
const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useAppDispatch();

    const handleIncrease = (productId: number) => {
        dispatch(increaseProductQuantity(productId));
    };

    const handleDecrease = (productId: number) => {
        dispatch(decreaseProductQuantity(productId));
    };

    const handleRemove = (productId: number) => {
        dispatch(removeProductFromCart(productId));
    };
    console.log(cart, 'cart');
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">
                Your Cart
            </h2>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {cart && cart.cartItems.length > 0 ? (
                    <div className="space-y-4">
                        {cart.cartItems.map((item) => (
                            <Card
                                key={item.cartItemId}
                                className="flex gap-4 p-4 border rounded-lg items-start"
                            >
                                <div className=" flex flex-col items-center">
                                    {item.productImages &&
                                    item.productImages.length > 0 ? (
                                        <Carousel
                                            className="w-full max-w-[500px] aspect-square rounded-sm"
                                            size="small"
                                            images={item.productImages.map(
                                                (url) => {
                                                    return BASE_URL + url;
                                                }
                                            )}
                                        />
                                    ) : (
                                        <span className="text-gray-500">
                                            No Image
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1 mt-2">
                                        <Button
                                            className="px-2 py-1"
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    handleDecrease(
                                                        item.productId
                                                    );
                                                } else if (
                                                    confirm(
                                                        'Are you sure you want to remove this item?'
                                                    )
                                                ) {
                                                    handleRemove(
                                                        item.productId
                                                    );
                                                }
                                            }}
                                        >
                                            -
                                        </Button>
                                        <input
                                            readOnly
                                            value={item.quantity}
                                            className="w-10 px-2 py-1 text-center border border-gray-300 rounded"
                                        />
                                        <Button
                                            className="px-2 py-1"
                                            onClick={() =>
                                                handleIncrease(item.productId)
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                {/* Right side: Product details */}
                                <div className="h-full">
                                    <h3 className="text-xl font-semibold line-clamp-1">
                                        {item.productName}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {item.productDescription}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Seller: ONLINEDEALINDIA
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-sm text-gray-400 line-through">
                                            ₹{item.price + 100}
                                        </p>
                                        <p className="text-lg font-bold text-green-700">
                                            ₹{item.price}
                                        </p>
                                        <span className="text-green-600 text-sm font-medium">
                                            1% Off
                                        </span>
                                        <span className="text-green-600 text-sm">
                                            1 offer applied
                                        </span>
                                    </div>

                                    <div className="flex gap-4 mt-2">
                                        <Button
                                            variant="outline-secondary"
                                            className="py-1"
                                        >
                                            Save for Later
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="py-1"
                                            onClick={() =>
                                                handleRemove(item.productId)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <div className="text-right text-xl font-semibold border-t pt-4">
                            Total: ₹{cart.totalPrice}
                        </div>
                        <Button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                            Proceed to Checkout
                        </Button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        Your cart is empty.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Cart;
