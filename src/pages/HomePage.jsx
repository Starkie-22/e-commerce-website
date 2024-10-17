import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../services/fakeStoreAPI';
import CategoryList from '../components/CategoryList';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
    Promise.all(categories.map(category => getProductsByCategory(category)))
      .then(products => setFeaturedProducts(products.map(p => p[0])));
  }, []);

  return (
    <div className="home-page">
      <CategoryList />
      <div className="featured-products">
        {featuredProducts.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="featured-product">
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;