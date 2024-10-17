import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../store/cartContext';
import OrderContext from '../store/orderContext';
import './OrderPlacingPage.css';

const DELIVERY_CHARGE = 50;

function OrderPlacingPage() {
  const { cartItems } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(cartTotal + DELIVERY_CHARGE);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    placeOrder(cartItems, totalPrice);
    alert('Order placed successfully!');
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="order-page">
      <h2>Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="order-item">
          <img src={item.image} alt={item.title} />
          <div className="order-item-info">
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
          </div>
        </div>
      ))}
      <p>Delivery Charge: ${DELIVERY_CHARGE}</p>
      <h3>Total: ${totalPrice}</h3>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default OrderPlacingPage;