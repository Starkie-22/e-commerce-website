import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsByCategory } from '../services/fakeStoreAPI.js';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const query = useQuery();
  const category = query.get('category');
  const search = query.get('search');

  useEffect(() => {
    if (category) {
      getProductsByCategory(category)
        .then(setProducts)
        .catch(() => setError('Failed to fetch products'));
    } else if (search) {
      fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then((data) => {
          const filteredProducts = data.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase())
          );
          setProducts(filteredProducts);
        })
        .catch(() => setError('Failed to fetch products'));
    }
  }, [category, search]);

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="products-page">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;