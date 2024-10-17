import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCartItems = [...cartItems, product];
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    alert('Product added to cart!');
  };
  

  const handleBuyNow = () => {
    navigate('/auth?redirect=order');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-detail-page">
      <img src={product.image} alt={product.title} />
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div className="product-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;