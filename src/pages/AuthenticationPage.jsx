import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import './AuthenticationPage.css';

function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { initializeDB, addUser, authenticateUser } = useAuth();

  useEffect(() => {
    initializeDB();
  }, [initializeDB]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const isAuthenticated = await authenticateUser(username, password);
      if (isAuthenticated) {
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage('Invalid username or password.');
      }
    } else {
      const isRegistered = await addUser(username, password);
      if (isRegistered) {
        setMessage('Registration successful! You can now log in.');
      } else {
        setMessage('Registration failed. Username may already exist.');
      }
    }
  };

  return (
    <div className="auth-page">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default AuthenticationPage;