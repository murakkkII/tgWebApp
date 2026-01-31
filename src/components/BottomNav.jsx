import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Trophy, Settings, UserRoundPlus } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
  const navItems = [
    { to: '/', label: 'Главная', icon: Home },
    { to: '/start', label: 'Играть', icon: Gamepad2 },
    { to: '/leaderboard', label: 'Лидеры', icon: Trophy },
    { to: '/settings', label: 'Настройки', icon: Settings },
    {to: '/team-battle', label: 'Team Play', icon: UserRoundPlus},
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end
          >
            <item.icon size={24} />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;