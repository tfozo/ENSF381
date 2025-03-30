import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthMessage from './AuthMessage';

export const AuthContext = createContext();

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState(null);
  const history = useHistory();

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

    // API Integration: Fetch user data
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.username === username && user.email === password);
        if (user) {
          setAuthStatus({ type: 'success', message: 'Login successful! Redirecting...' });
          // Redirect after 2 seconds
          setTimeout(() => {
            history.push('/courses');
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
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>LMS Login</h2>
          <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
            <div>
              <label htmlFor="username">Username:</label><br/>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br/><br/>
              <label htmlFor="password">Password:</label><br/>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br/><br/>
            </div>
            <button type="submit">Login</button><br/><br/>
            <a href="#">Forgot Password?</a>
          </form>
          <AuthMessage />
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default LoginForm;
