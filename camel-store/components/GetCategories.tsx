"use client";
import React, { useEffect, useState } from "react";

// Define a TypeScript interface for the category data
interface Category {
	id: number;
	category_name: string;
	description: string;
}

const GetCategories: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("http://127.0.0.1:8000/shop/categories/");
				if (!response.ok) throw new Error("Network response was not ok");
				const data: Category[] = await response.json();
				setCategories(data);
			} catch (err) {
				setError(err as Error);
			}
		};

		fetchCategories();
	}, []);

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<h1>Categories</h1>
			<ul>
				{categories.map((category) => (
					<li key={category.id}>
						<h2>{category.category_name}</h2>
						<p>{category.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GetCategories;
