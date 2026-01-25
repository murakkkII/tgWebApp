import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../UI/Icon/Icon';
import Button from '../../UI/Button/Button';
import './Navbar.css';

const Navbar = ({ onThemeToggle, theme = 'dark', user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'home' },
    { path: '/play', label: 'Играть', icon: 'play' },
    { path: '/leaderboard', label: 'Лидеры', icon: 'trophy' },
    { path: '/profile', label: 'Профиль', icon: 'user' },
    { path: '/settings', label: 'Настройки', icon: 'settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            <Icon name="sword" size={28} />
            <span className="navbar-logo-text">QuizDuel</span>
          </div>
          <div className="navbar-subtitle">Интеллектуальные битвы</div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <div className="navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="navbar-actions">
            <Button
              variant="secondary"
              size="small"
              icon={theme === 'dark' ? 'sun' : 'moon'}
              onClick={onThemeToggle}
              aria-label="Переключить тему"
            />
            
            {user && (
              <div className="navbar-user">
                <div className="navbar-user-avatar">
                  <Icon name="user" size={16} />
                </div>
                <span className="navbar-user-name">{user.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <Icon name={isMenuOpen ? 'x' : 'menu'} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-mobile">
          <div className="navbar-mobile-content">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-mobile-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
                <Icon name="chevronRight" size={16} className="navbar-mobile-arrow" />
              </Link>
            ))}
            
            <div className="navbar-mobile-footer">
              <div className="navbar-mobile-theme">
                <span>Тема:</span>
                <Button
                  variant="tertiary"
                  size="small"
                  icon={theme === 'dark' ? 'sun' : 'moon'}
                  onClick={onThemeToggle}
                >
                  {theme === 'dark' ? 'Светлая' : 'Темная'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;