"use client";
import React, { useEffect, useState } from "react";
import ShopCard from "@components/ShopCard"; // Make sure the path to ShopCard is correct

interface Product {
	id: number;
	name: string;
	description: string;
	stock_quantity: number;
	category: string;
	image_url: string;
}

const ProductsPage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://127.0.0.1:8000/products/");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data: Product[] = await response.json();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h1>Products</h1>
			<div className="w-full flex flex-wrap justify-evenly items-start gap-5">
				{products.map((product, index) => (
					<ShopCard
						key={index}
						id={product.id}
						name={product.name}
						description={product.description}
						stock_quantity={product.stock_quantity}
						category={product.category}
						image_url={product.image_url}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductsPage;
