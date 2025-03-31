import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthMessage from './AuthMessage';

export const AuthContext = createContext();

const LoginFormMain = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!username || !password) {
      setAuthStatus({ type: 'error', message: 'Username and password cannot be empty.' });
      return;
    }
    if (password.length < 8) {
      setAuthStatus({ type: 'error', message: 'Password must be at least 8 characters.' });
      return;
    }

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.username === username && user.email === password);
        if (user) {
          setAuthStatus({ type: 'success', message: 'Login successful! Redirecting...' });
          setTimeout(() => {
            navigate('/courses');
          }, 2000);
        } else {
          setAuthStatus({ type: 'error', message: 'Invalid username or password!' });
        }
      })
      .catch(error => {
        setAuthStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
      });
  };

  return (
    <AuthContext.Provider value={{ authStatus }}>
      <div className="loginContainer">
        <h2>LMS Login</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="formGroup">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="loginButton">Login</button>
          <a href="#" className="forgotPassword">Forgot Password?</a>
        </form>
        <AuthMessage />
      </div>
    </AuthContext.Provider>
  );
};

const LoginForm = () => {
  return (
    <div>
      <Header />
      <LoginFormMain />
      <Footer />
    </div>
  );
};

export default LoginForm;
