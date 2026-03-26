import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsLoggedIn, toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <Link to="/" className="navbar-title-link" style={{ textDecoration: 'none' }}>
          <h1 className="navbar-title">MYGYM</h1>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Stats</NavLink>
        </li>
        <li>
          <NavLink to="/meal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Meal</NavLink>
        </li>
        <li>
          <NavLink to="/exercises" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Exercises</NavLink>
        </li>
        <li>
          <button className="nav-button logout-nav-btn" onClick={handleLogout} style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            LEAVE
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
