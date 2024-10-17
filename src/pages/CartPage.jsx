import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';
import './CartPage.css';

function CartPage() {
  const { cartItems, removeItem } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleProceedToCheckout = () => {
    navigate('/auth?redirect=order');
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="cart-item-info">
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default CartPage;