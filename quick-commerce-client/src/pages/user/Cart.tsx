import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import CardContent from "../../components/shared/CardContent";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { increaseProductQuantity, decreaseProductQuantity, removeProductFromCart } from "../../store/cart.slice";
// import { increaseQuantity, decreaseQuantity, decreaseProductQuantity } from "../../store/cart.slice";

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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {cart && cart.cartItems.length > 0 ? (
                    <div className="space-y-4">
                        {cart.cartItems.map((item) => (
                            <Card key={item.cartItemId} className="flex justify-between p-4 border rounded-lg">
                                <CardContent className="flex items-center gap-4 w-full">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium">{item.productName}</h3>
                                        <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button className="px-3 py-1 bg-red-500 text-white" onClick={() => handleDecrease(item.productId)}>-</Button>
                                            <p className="text-lg">{item.quantity}</p>
                                            <Button className="px-3 py-1 bg-green-500 text-white" onClick={() => handleIncrease(item.productId)}>+</Button>
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
                                    <Button className="bg-gray-500 text-white px-3 py-1" onClick={() => handleRemove(item.productId)}>Remove</Button>
                                </CardContent>
                            </Card>
                        ))}
                        <div className="text-right text-xl font-semibold border-t pt-4">Total: ₹{cart.totalPrice}</div>
                        <Button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Proceed to Checkout</Button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
