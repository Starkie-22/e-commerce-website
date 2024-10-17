import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import flipkartLogo from '../assets/flipkart-logo.jpg';
import './NavBar.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={flipkartLogo} alt="Website Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for products" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="navbar-right">
        <Link to="/cart">
          <i className="cart-icon">🛒</i>
        </Link>
        <Link to="/auth">
          <i className="login-icon">🔑</i>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;