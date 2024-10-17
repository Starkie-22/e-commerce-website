import { useEffect } from 'react';
import { useOrders } from '../store/useOrder';
import './OrdersPage.css';

function OrdersPage() {
  const { orders, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (orders.length === 0) {
    return <p>You haven&apos;t placed any orders yet.</p>;
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <h3>Order #{order.id}</h3>
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.title} />
              <div className="order-item-info">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
          <p>Status: {order.status}</p>
          <h4>Total: ${order.total}</h4>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;