import { Product } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

interface CartItem extends Product {
    // Extend this later with product info
    id: number;
}

interface Cart {
    cartId: number;
    userId: number;
    cartItems: CartItem[];
    totalPrice: number;
}

const MyAccount = () => {
    const user = useSelector((state: RootState) => state?.auth.user);

    const cart: Cart = {
        cartId: 2,
        userId: 3,
        cartItems: [],
        totalPrice: 0,
    };
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        My Account
                    </h2>
                    <p className="text-gray-500">
                        Please log in to view your account details.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    My Account
                </h2>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            👤 Profile Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium">Name:</span>{' '}
                                {user.name}
                            </div>
                            <div>
                                <span className="font-medium">Email:</span>{' '}
                                {user.email}
                            </div>
                            {/* <div><span className="font-medium">Role:</span> {user.role.replace('ROLE_', '')}</div> */}
                            <div>
                                <span className="font-medium">Joined:</span>{' '}
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🛒 Cart Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium">Cart ID:</span>{' '}
                                {cart.cartId}
                            </div>
                            <div>
                                <span className="font-medium">
                                    Total Price:
                                </span>{' '}
                                ₹{cart.totalPrice}
                            </div>
                            <div>
                                <span className="font-medium">
                                    Items in Cart:
                                </span>{' '}
                                {cart.cartItems.length}
                            </div>
                        </div>
                    </div>

                    {/* Future Info Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            📦 More Info
                        </h3>
                        <p className="text-gray-500 text-sm">
                            You can add shipping address, payment methods, order
                            history, etc. later.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
