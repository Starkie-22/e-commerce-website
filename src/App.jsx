import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AuthenticationPage from './pages/AuthenticationPage';
import OrderPlacingPage from './pages/OrderPlacingPage';
import OrdersPage from './pages/OrdersPage';
import Navbar from './components/NavBar';
import { AuthProvider } from './store/authContext';
import { CartProvider } from './store/cartContext';
import { OrderProvider } from './store/orderContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/auth" element={<AuthenticationPage />} />
                <Route path="/order" element={<OrderPlacingPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
