"use client"
import { useState, useEffect } from 'react';
import { fetchCart, fetchProducts } from '@/lib/api';

export default function Page() {
    const [carts, setCarts] = useState(null);
    const [products, setProducts] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCarts = async () => {
            try {
                const result = await fetchCart(""); // Adjust this based on your API's requirement
                setCarts(result);
                setError(null);

                // Fetch products for all cart items
                const productIds = new Set();
                result.forEach(cart => {
                    cart.items.forEach(item => productIds.add(item.product));
                });

                const productData = {};
                await Promise.all(
                    Array.from(productIds).map(async (productId) => {
                        const product = await fetchProducts(productId);
                        productData[productId] = product;
                    })
                );
                setProducts(productData);
            } catch (error) {
                setError(error.message);
                setCarts(null);
            } finally {
                setLoading(false);
            }
        };

        loadCarts();
    }, []);

    if (loading) {
        return <div>Loading carts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Carts Data</h1>
            {carts ? (
                carts.map((cart) => (
                    <ul key={cart.id}>
                        Cart ID: {cart.id}
                        {cart.items.map(item => (
                            <li key={item.id}>
                                Quantity: {item.quantity} | Product: {products[item.product]?.product_name || 'Loading...'} | Total Price: {item.get_total_price}
                            </li>
                        ))}
                    </ul>
                ))
            ) : (
                <p>No carts data available.</p>
            )}
        </div>
    );
}
