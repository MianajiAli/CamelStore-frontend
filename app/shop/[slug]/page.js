"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProducts } from '@/lib/api'; // Adjust the import based on your file structure
import { addItemToCart } from '@/lib/api'; // Assuming the API function is located here

const ProductPage = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProducts(slug);
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product. Please try again later.');
            }
        };

        getProduct();
    }, [slug]);

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <div className="w-full flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
            <img
                src={product.image_url}
                alt={product.product_name}
                className="mb-4 w-40 h-auto"
            />
            <p className="text-lg font-semibold mb-2">Price: {product.price}</p>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500">In Stock: {product.quantity_in_stock}</p>
            <button
                onClick={() => addItemToCart("10", product.id, 2)}
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Add to Cart
            </button>
        </div >
    );
};

export default ProductPage;
