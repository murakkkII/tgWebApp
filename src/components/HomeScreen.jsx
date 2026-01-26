import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Settings, Trophy, Brain, Users, Star } from 'lucide-react';
import './HomeScreen.css';

function HomeScreen({ score, settings }) {
  const navigate = useNavigate();

  const stats = [
    { icon: Trophy, value: '5K+', label: 'Игроков', color: '#f59e0b' },
    { icon: Brain, value: '500+', label: 'Вопросов', color: '#10b981' },
    { icon: Users, value: '99%', label: 'Довольны', color: '#6366f1' },
    { icon: Star, value: '4.9', label: 'Рейтинг', color: '#ec4899' },
  ];

  return (
    <div className="home-screen animate-fade-in">
      <div className="home-container">
        {/* Hero секция */}
        <div className="home-hero">
          <div className="hero-logo">
            <div className="logo-circle">
              <Brain size={48} />
            </div>
          </div>
          
          <div className="hero-content">
            <h1>DuelQuiz</h1>
            <p className="hero-subtitle">
              Проверь свои знания в захватывающих дуэлях!
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card card">
                <div className="stat-icon" style={{ color: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Основные действия */}
        <div className="actions-section">
          <button 
            className="btn btn-primary btn-large btn-full"
            onClick={() => navigate('/start')}
          >
            <Play size={20} />
            Начать игру
          </button>
          
          <div className="quick-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/settings')}
            >
              <Settings size={18} />
              Настройки
            </button>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="cta-section card">
          <h3>Твой счет: {score}</h3>
          <p>Соревнуйся с друзьями и поднимайся в рейтинге!</p>
          <button 
            className="btn btn-primary mt-6"
            onClick={() => navigate('/start')}
          >
            Играть сейчас
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;