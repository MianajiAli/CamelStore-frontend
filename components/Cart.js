"use client";
import { useState, useEffect } from 'react';
import { fetchCart, fetchProducts, deleteCartItem } from '@/lib/api';

export default function Page() {
    const [carts, setCarts] = useState(null);
    const [products, setProducts] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to load carts and products
    const loadCarts = async () => {
        try {
            setLoading(true);
            const result = await fetchCart(""); // Adjust this based on your API's requirement
            setCarts(result);
            setError(null);

            // Fetch products for all cart items
            const productIds = new Set();
            result.forEach(cart => {
                cart.items.forEach(item => productIds.add(item.product));
            });

            const productData = {};
            const fetchProductPromises = Array.from(productIds).map(async (productId) => {
                try {
                    const product = await fetchProducts(productId);
                    productData[productId] = product;
                } catch (err) {
                    console.error(`Failed to fetch product ${productId}:`, err);
                }
            });

            await Promise.all(fetchProductPromises);
            setProducts(productData);
        } catch (error) {
            setError(error.message);
            setCarts(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCarts();
    }, []);

    // Handle item deletion
    const handleDeleteItem = async (cartId, itemId) => {
        try {
            await deleteCartItem(cartId, itemId);
            // Re-fetch the carts data after successful deletion
            await loadCarts();
        } catch (error) {
            setError('Failed to delete item');
        }
    };

    if (loading) {
        return <div>Loading carts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Carts Data</h1>
            <div className="w-full flex flex-col gap-5 items-center">
                {carts ? (
                    carts.map((cart) => (
                        <ul className="w-10/12 bg-back2 rounded-lg p-5 flex flex-col gap-1" key={cart.id}>
                            <span className="text-textsecondary">
                                Cart ID: {cart.id}
                            </span>
                            {cart.items.map(item => (
                                <li className="flex w-full bg-textsecondary text-back1 rounded-md" key={item.id}>
                                    <img className="w-28 mr-3 rounded-md" src={products[item.product]?.image_url || '/default-loading-image.png'} alt={products[item.product]?.product_name || 'Loading...'} />
                                    <div className="flex flex-col justify-center">
                                        <span>
                                            Product: {products[item.product]?.product_name || 'Loading...'}
                                        </span>
                                        <div className="flex">
                                            <div className="text-center rounded-full w-8 h-8 bg-black flex justify-center items-center">-</div>
                                            <div className="text-center rounded-full w-8 h-8 bg-black flex justify-center items-center">{item.quantity}</div>
                                            <div className="text-center rounded-full w-8 h-8 bg-black flex justify-center items-center">+</div>
                                            <button onClick={() => handleDeleteItem(cart.id, item.id)} className="text-center rounded-full w-8 h-8 bg-black flex justify-center items-center">x</button>
                                        </div>
                                        <span>
                                            Price: {products[item.product]?.price ? `$${products[item.product]?.price}` : 'Loading...'}
                                        </span>
                                        <span>
                                            Total Price: {item.get_total_price ? `$${item.get_total_price}` : 'Calculating...'}
                                        </span>
                                        id{item.id}-p
                                        {item.product}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ))
                ) : (
                    <p>No carts data available.</p>
                )}
            </div>
        </div>
    );
}
