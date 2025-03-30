import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#004080', color: 'white' }}>
      <div>
        <img src={logo} alt="LMS Logo" height="100" width="100" />
      </div>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
      </nav>
    </header>
  );
};

export default Header;
