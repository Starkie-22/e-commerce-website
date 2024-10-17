import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsByCategory } from '../services/fakeStoreAPI';
import './CategoryList.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const fetchImagesForCategories = async () => {
      const images = {};

      for (const category of categories) {
        const products = await getProductsByCategory(category);
        const randomProduct = products[Math.floor(Math.random() * products.length)];

        images[category] = randomProduct.image;
      }

      setCategoryImages(images);
    };

    if (categories.length > 0) {
      fetchImagesForCategories();
    }
  }, [categories]);

  return (
    <div className="category-list">
      {categories.map((category) => (
        <Link key={category} to={`/products?category=${category}`} className="category-item">
          {categoryImages[category] ? (
            <img src={categoryImages[category]} alt={category} style= {{ width: '100%', marginRight: '20px' }} />
          ) : (
            <p>Loading...</p>
          )}
          <p>{category}</p>
        </Link>
      ))}
    </div>
  );
}

export default CategoryList;