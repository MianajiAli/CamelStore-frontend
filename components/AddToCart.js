// components/TestApiComponent.js
import { useState } from 'react';
import {
    fetchCategories,
    fetchProducts,
    fetchCart,
    addItemToCart,
    updateCartItem,
    deleteCartItem
} from '../lib/api';

const TestApiComponent = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(null);
    const [status, setStatus] = useState('');

    const [cartId, setCartId] = useState(1); // Example cart ID
    const [productId, setProductId] = useState(5); // Example product ID
    const [quantity, setQuantity] = useState(2);
    const [itemId, setItemId] = useState(1); // Example item ID for update and delete

    const handleFetchCategories = async () => {
        try {
            const result = await fetchCategories();
            setCategories(result);
            setStatus('Categories fetched successfully!');
        } catch (error) {
            setStatus('Error fetching categories');
            console.error('Error:', error);
        }
    };

    const handleFetchProducts = async () => {
        try {
            const result = await fetchProducts();
            setProducts(result);
            setStatus('Products fetched successfully!');
        } catch (error) {
            setStatus('Error fetching products');
            console.error('Error:', error);
        }
    };

    const handleFetchCart = async () => {
        try {
            const result = await fetchCart(cartId);
            setCart(result);
            setStatus('Cart fetched successfully!');
        } catch (error) {
            setStatus('Error fetching cart');
            console.error('Error:', error);
        }
    };

    const handleAddToCart = async () => {
        try {
            const result = await addItemToCart(cartId, productId, quantity);
            setStatus('Item added to cart successfully!');
            console.log('Success:', result);
        } catch (error) {
            setStatus('Error adding item to cart');
            console.error('Error:', error);
        }
    };

    const handleUpdateCartItem = async () => {
        try {
            const result = await updateCartItem(cartId, itemId, quantity);
            setStatus('Cart item updated successfully!');
            console.log('Success:', result);
        } catch (error) {
            setStatus('Error updating cart item');
            console.error('Error:', error);
        }
    };

    const handleDeleteCartItem = async () => {
        try {
            const result = await deleteCartItem(cartId, itemId);
            setStatus('Cart item deleted successfully!');
            console.log('Success:', result);
        } catch (error) {
            setStatus('Error deleting cart item');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>API Test Component</h1>

            <button onClick={handleFetchCategories}>Fetch Categories</button>
            <button onClick={handleFetchProducts}>Fetch Products</button>
            <button onClick={handleFetchCart}>Fetch Cart</button>
            <button onClick={handleAddToCart}>Add Item to Cart</button>
            <button onClick={handleUpdateCartItem}>Update Cart Item</button>
            <button onClick={handleDeleteCartItem}>Delete Cart Item</button>

            <p>Status: {status}</p>

            {categories.length > 0 && (
                <div>
                    <h2>Categories</h2>
                    <ul>
                        {categories.map(category => (
                            <li key={category.id}>{category.category_name}</li>
                        ))}
                    </ul>
                </div>
            )}

            {products.length > 0 && (
                <div>
                    <h2>Products</h2>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>{product.product_name}</li>
                        ))}
                    </ul>
                </div>
            )}

            {cart && (
                <div>
                    <h2>Cart</h2>
                    <pre>{JSON.stringify(cart, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TestApiComponent;
