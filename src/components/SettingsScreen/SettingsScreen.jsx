import React from 'react';
import { ArrowLeft, Settings, Trophy, Sword, Zap, Brain, Users, Clock, Target, BarChart } from 'lucide-react';
import './StartScreen.css';

function StartScreen({ onStart, onSettings, score, onHome }) {
  const gameModes = [
    {
      title: 'Классическая дуэль',
      icon: Sword,
      description: '10 вопросов на время',
      time: '1-2 мин',
      difficulty: 'Средняя',
      action: () => onStart({ mode: 'classic', difficulty: 'normal', questionCount: 10 })
    },
    {
      title: 'Экспресс режим',
      icon: Zap,
      description: '5 быстрых вопросов',
      time: '30 сек',
      difficulty: 'Легкая',
      action: () => onStart({ mode: 'express', difficulty: 'easy', questionCount: 5 })
    },
    {
      title: 'Экспертная дуэль',
      icon: Brain,
      description: '15 сложных вопросов',
      time: '3-4 мин',
      difficulty: 'Сложная',
      action: () => onStart({ mode: 'expert', difficulty: 'hard', questionCount: 15 })
    },
    {
      title: 'Соревнование',
      icon: Users,
      description: 'Соревнуйся с друзьями',
      time: '2-3 мин',
      difficulty: 'Средняя',
      action: () => onStart({ mode: 'versus', difficulty: 'normal', questionCount: 10 }),
      comingSoon: true
    }
  ];

  return (
    <div className="screen start-screen">
      <div className="start-header">
        <button className="back-btn" onClick={onHome}>
          <ArrowLeft size={24} />
        </button>
        <div className="header-title">
          <h1>DuelQuiz</h1>
          <p className="header-subtitle">Дружеские дуэли знаний на скорость</p>
        </div>
      </div>

      <div className="score-display">
        <div className="score-card">
          <Trophy size={48} className="score-icon" />
          <div className="score-content">
            <div className="score-label">Твой общий счет</div>
            <div className="score-value">{score.toLocaleString()}</div>
          </div>
          <div className="score-ribbon">Чемпион</div>
        </div>
      </div>

      <div className="game-modes">
        <h2 className="section-title">Выбери режим игры</h2>
        <p className="section-subtitle">Каждый режим предлагает уникальный вызов</p>
        
        <div className="modes-grid">
          {gameModes.map((mode, index) => {
            const IconComponent = mode.icon;
            return (
              <div 
                key={index}
                className={`mode-card ${mode.comingSoon ? 'coming-soon' : ''}`}
                onClick={mode.comingSoon ? null : mode.action}
              >
                {mode.comingSoon && (
                  <div className="coming-soon-badge">Скоро</div>
                )}
                
                <div className="mode-header">
                  <h3 className="mode-title">{mode.title}</h3>
                  <IconComponent size={32} className="mode-icon" />
                </div>
                
                <p className="mode-description">{mode.description}</p>
                
                <div className="mode-stats">
                  <div className="stat">
                    <Clock size={16} className="stat-icon" />
                    <span className="stat-label">Время:</span>
                    <span className="stat-value">{mode.time}</span>
                  </div>
                  <div className="stat">
                    <Target size={16} className="stat-icon" />
                    <span className="stat-label">Сложность:</span>
                    <span className={`stat-value difficulty-${mode.difficulty.toLowerCase()}`}>
                      {mode.difficulty}
                    </span>
                  </div>
                </div>
                
                <button 
                  className={`btn ${mode.comingSoon ? 'btn-tertiary' : 'btn-primary'}`}
                  onClick={mode.comingSoon ? null : mode.action}
                  disabled={mode.comingSoon}
                >
                  {mode.comingSoon ? 'Скоро доступно' : 'Начать'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="quick-actions">
        <button className="btn btn-secondary" onClick={onSettings}>
          <Settings size={18} />
          Настройки
        </button>
        
        <button className="btn btn-tertiary">
          <BarChart size={18} />
          Таблица лидеров
        </button>
      </div>

      <div className="stats-preview">
        <div className="stat-item">
          <div className="stat-number">5+</div>
          <div className="stat-label">тематик</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">вопросов</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">∞</div>
          <div className="stat-label">комбинаций</div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;