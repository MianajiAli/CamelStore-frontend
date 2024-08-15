// components/CategoryList.js
"use client"; // Ensure the component is client-side rendered

import React, { useEffect, useState } from 'react';
import { fetchCategories } from '@/lib/api'; // Adjust the import based on your project structure

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories("");
                setCategories(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getCategories();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (categories.length === 0) return <div>Loading...</div>;

    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id}>{category.category_name}</li>
            ))}
        </ul>
    );
};

export default CategoryList;
