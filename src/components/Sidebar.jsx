import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Workouts', path: '/exercises', icon: '🏋️' },
        { name: 'Nutrition', path: '/meal', icon: '🥗' },
        { name: 'Progress', path: '/bmi', icon: '📈' },
        { name: 'Profile', path: '/profile', icon: '👤' },
        { name: 'Checklist', path: '/checklist', icon: '✅' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            )}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2 className="text-gradient">MYGYM AI</h2>
                    <button className="close-btn" onClick={toggleSidebar}>×</button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            onClick={() => {
                                if (window.innerWidth < 768) toggleSidebar();
                            }}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-text">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
