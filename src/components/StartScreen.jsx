import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, Zap, Brain, Clock, Target, ArrowLeft } from 'lucide-react';
import './StartScreen.css';

function StartScreen({ score }) {
  const navigate = useNavigate();

  const gameModes = [
    {
      id: 'classic',
      title: 'Классика',
      icon: Sword,
      description: '10 вопросов на время',
      time: '2 мин',
      difficulty: 'Средняя',
      color: '#4f46e5'
    },
    {
      id: 'express',
      title: 'Экспресс',
      icon: Zap,
      description: '5 быстрых вопросов',
      time: '1 мин',
      difficulty: 'Легкая',
      color: '#10b981'
    },
    {
      id: 'expert',
      title: 'Эксперт',
      icon: Brain,
      description: '15 сложных вопросов',
      time: '3 мин',
      difficulty: 'Сложная',
      color: '#ec4899'
    }
  ];

  return (
    <div className="start-screen animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Выбор режима</h1>
        <div className="score-badge">
          <span>Счет: {score}</span>
        </div>
      </div>

      <div className="modes-grid">
        {gameModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <div 
              key={mode.id}
              className="mode-card card"
              onClick={() => navigate('/duel')}
            >
              <div className="mode-header">
                <div className="mode-icon" style={{ background: mode.color }}>
                  <Icon size={24} />
                </div>
                <div className="mode-info">
                  <h3>{mode.title}</h3>
                  <p className="mode-description">{mode.description}</p>
                </div>
              </div>
              
              <div className="mode-stats">
                <div className="stat">
                  <Clock size={16} />
                  <span>{mode.time}</span>
                </div>
                <div className="stat">
                  <Target size={16} />
                  <span>{mode.difficulty}</span>
                </div>
              </div>
              
              <button className="btn btn-primary btn-full">
                Играть
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StartScreen;