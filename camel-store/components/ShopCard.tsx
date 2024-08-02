import React from "react";
import Image from "next/image";

// Define the interface for the props
interface ShopCardProps {
	id: number;
	product_name: string;
	description: string;
	quantity_in_stock: number;
	category: number;
	price: string;
	image_url: string;
}

// Define the ShopCard component with TypeScript
const ShopCard: React.FC<ShopCardProps> = ({
	product_name,
	description,
	quantity_in_stock,
	category,
	price,
	image_url,
}) => {
	const fallbackImage = "/Untitled.png";

	return (
		<div className="w-62 p-2 rounded-md bg-back2 flex flex-col">
			<div className="relative w-56 h-60 aspect-square bg-back1 rounded-md overflow-hidden">
				<Image
					src={image_url || fallbackImage}
					alt={product_name}
					layout="fill"
					objectFit="cover"
					className="rounded-md"
					onError={(e) => {
						(e.target as HTMLImageElement).src = fallbackImage;
					}}
				/>
			</div>
			<div className=" flex flex-col items-center py-1">
				<h2 className="text-lg font-semibold text-textprimary mt-2">
					{product_name}
				</h2>
				<p className="text-sm text-textsecondary mt-1">
					{parseFloat(price).toFixed(0)}
				</p>
			</div>
		</div>
	);
};

export default ShopCard;
