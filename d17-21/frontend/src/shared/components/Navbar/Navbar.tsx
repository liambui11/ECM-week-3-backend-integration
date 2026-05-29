import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../features/auth';
import './Navbar.css';

interface NavbarProps {
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="app-navbar" id="dashboard-navbar">
      <div className="nav-brand">
        <h1 className="brand-title">E+CRAFTMAN</h1>
      </div>
      
      <nav className="nav-menu">
        <NavLink
          to="/products"
          className={({ isActive }: { isActive: boolean }) => `nav-link-tab ${isActive ? 'active' : ''}`}
          id="nav-link-products"
        >
          Products
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }: { isActive: boolean }) => `nav-link-tab ${isActive ? 'active' : ''}`}
          id="nav-link-categories"
        >
          Categories
        </NavLink>
      </nav>
      
      <div className="nav-footer">
        <div className="user-info">
          <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
          <span className="user-greeting">Welcome, {user.name}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </aside>
  );
};

export default Navbar;
