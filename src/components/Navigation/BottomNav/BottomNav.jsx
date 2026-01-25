import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../UI/Icon/Icon';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'home' },
    { path: '/play', label: 'Игра', icon: 'play' },
    { path: '/leaderboard', label: 'Топ', icon: 'trophy' },
    { path: '/profile', label: 'Профиль', icon: 'user' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="bottom-nav-icon">
              <Icon name={item.icon} size={22} />
            </div>
            <span className="bottom-nav-label">{item.label}</span>
            
            {isActive && (
              <div className="bottom-nav-indicator" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;