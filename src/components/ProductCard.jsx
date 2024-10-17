import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;