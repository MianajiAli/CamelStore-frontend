interface PageProps {
	params: {
		slug: string;
	};
}

export default async function Page({ params }: PageProps) {
	// Construct the URL using the slug parameter
	const url = `http://127.0.0.1:8000/shop/products/${params.slug}/?format=json`;

	// Fetch data from the URL
	let data;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		data = await response.json();
	} catch (error) {
		console.error("Error fetching data:", error);
		data = null;
	}

	return (
		<div>
			<h1>Page</h1>
			<p>Slug: {params.slug}</p>
			{data ? (
				<div>
					<h2>Product Details:</h2>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			) : (
				<p>No data found.</p>
			)}
		</div>
	);
}
