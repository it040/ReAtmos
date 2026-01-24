import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navigation Bar Component
 * Main navigation with active route highlighting
 */
const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/aqi-predictor' && location.pathname === '/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon"></span>
          <span className="logo-text">ReAtmos</span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
               Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/aqi-predictor"
              className={`nav-link ${isActive('/aqi-predictor') ? 'active' : ''}`}
            >
              AQI Predictor
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
