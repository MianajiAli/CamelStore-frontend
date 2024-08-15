"use client"
// components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts("");
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getProducts();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>Loading...</div>;


  return (
    <div className="flex flex-row flex-wrap w-full justify-center gap-5">

      {
        products.map((product, index) => (
          <ProductCard key={index} product={product}></ProductCard>
        ))
      }
    </div >
  );
};

export default ProductList;
