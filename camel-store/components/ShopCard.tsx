import React from "react";
import Image from "next/image";

// Define the interface for the props
interface ShopCardProps {
	id: number;
	name: string;
	description: string;
	stock_quantity: number;
	category: string;
	image_url: string;
}

// Define the ShopCard component with TypeScript
const ShopCard: React.FC<ShopCardProps> = ({
	name,
	description,
	stock_quantity,
	category,
	image_url,
}) => {
	return (
		<div className="w-60 h-80 p-3 rounded-md bg-zinc-700 flex flex-col">
			<div className="aspect-square bg-cyan-300 rounded-md relative">
				<Image
					src={image_url}
					alt={name}
					layout="fill" // `fill` makes the image cover the parent div
					objectFit="cover" // Adjusts how the image fits into the container
					className="rounded-md"
				/>
			</div>
			<h2 className="text-lg font-semibold text-white mt-2">{name}</h2>
			<p className="text-sm text-gray-300 mt-1">{description}</p>
			<p className="text-sm text-gray-400 mt-1">Stock: {stock_quantity}</p>
			<p className="text-sm text-gray-400 mt-1">Category: {category}</p>
		</div>
	);
};

export default ShopCard;
