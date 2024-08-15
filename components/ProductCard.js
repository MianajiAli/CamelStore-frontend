"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { addItemToCart } from '@/lib/api'; // Assuming the API function is located here

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        try {
            // Log the quantity and product ID to the console
            console.log(`Adding ${quantity} of ${product.product_name} (ID: ${product.id}) to cart.`);

            // Assuming you have a cartId available. Replace 'yourCartId' with actual cart ID.
            const cartId = '4';

            // Call the API function to add the item to the cart
            const response = await addItemToCart(cartId, product.id, quantity);
            console.log('Item added to cart:', response);
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    return (
        <div className="w-52 bg-back2 p-3 flex flex-col gap-3">
            {/* Product image */}
            <img src={product.image_url} alt={product.product_name} width={200} height={200} />

            {/* Product details */}
            <h2>{product.product_name}</h2>
            <span>${product.price}</span>
            <div className="flex">
                {/* Input for quantity */}
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    min="1"
                    className="w-20 h-10 p-1"
                />

                {/* Button to add product to cart */}
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
