"use client";
import React, { useState, useEffect } from "react";
import ShopCard from "./ShopCard"; // Import your ShopCard component
import Link from "next/link";

// Sample Product Data Interface
interface Product {
	id: number;
	product_name: string;
	description: string;
	quantity_in_stock: number;
	category: number;
	price: string;
	image_url: string;
}

const ParentComponent: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					"http://127.0.0.1:8000/shop/products/?format=json"
				);
				if (!response.ok) throw new Error("Failed to fetch products");
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<h1>Product List</h1>
			<div className="w-full flex flex-row flex-wrap justify-center gap-5">
				{products.map((product) => (
					<Link key={product.id} href={`/shop/` + product.id.toString()}>
						<ShopCard
							key={product.id}
							id={product.id}
							product_name={product.product_name}
							description={product.description}
							quantity_in_stock={product.quantity_in_stock}
							category={product.category}
							price={product.price}
							image_url={product.image_url}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ParentComponent;
