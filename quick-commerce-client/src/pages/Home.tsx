const products = [
    { id: 1, name: "Wireless Headphones", price: "$99.99", image: "https://via.placeholder.com/200" },
    { id: 2, name: "Smart Watch", price: "$149.99", image: "https://via.placeholder.com/200" },
    { id: 3, name: "Gaming Mouse", price: "$49.99", image: "https://via.placeholder.com/200" },
    { id: 4, name: "Mechanical Keyboard", price: "$129.99", image: "https://via.placeholder.com/200" }
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Product Grid */}
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" />
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-lg text-blue-600 font-bold">{product.price}</p>
                            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
