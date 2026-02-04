import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, User, Menu } from 'lucide-react';
import './Navbar.css';

function Navbar({ score }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'DuelQuiz';
      case '/start': return 'Выбор режима';
      case '/duel': return 'Дуэль';
      case '/settings': return 'Настройки';
      default: return 'DuelQuiz';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {location.pathname !== '/' && (
            <button 
              className="nav-btn"
              onClick={() => navigate('/')}
              aria-label="На главную"
            >
              <Home size={20} />
            </button>
          )}
          <h1 className="navbar-title">{getTitle()}</h1>
        </div>

        <div className="navbar-right">
          <div className="score-display">
            <Trophy size={18} />
            <span>{score}</span>
          </div>
          
          <button 
            className="nav-btn"
            onClick={() => navigate('/settings')}
            aria-label="Настройки"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;