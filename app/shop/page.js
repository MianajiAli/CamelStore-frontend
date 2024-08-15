// pages/index.js
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';

const HomePage = () => (
    <div>
        <h1>Categories</h1>
        <CategoryList />
        <h1>Products</h1>
        <ProductList />
    </div>
);

export default HomePage;
