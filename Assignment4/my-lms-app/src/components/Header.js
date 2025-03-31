import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import '../App.css';


const Header = () => {
  return (
    <div>
      <header className="pageHeader">
        <img src={logo} alt="LMS Logo" style={{ width: '100px', height: '100px' }} />
        <h1>LMS - Learning Management System</h1>
      </header>
      <div className="navbar">
        <Link to="/" className="headerLink">Home</Link>
        <Link to="/courses" className="headerLink">Courses</Link>
        <Link to="/login" className="headerLink">Login</Link>
      </div>
    </div>
  );
};

export default Header;
