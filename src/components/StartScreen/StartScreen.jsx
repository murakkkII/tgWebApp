import React from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Icon from '../UI/Icon/Icon';
import './StartScreen.css';

export default function StartScreen({ onStart, onSettings, score, onHome, settings }) {
  const gameModes = [
    {
      id: 'classic',
      title: 'Классическая дуэль',
      description: '10 вопросов на время',
      time: '1-2 мин',
      difficulty: 'normal',
      icon: 'sword',
      color: 'var(--color-primary)'
    },
    {
      id: 'express',
      title: 'Экспресс режим',
      description: '5 быстрых вопросов',
      time: '30 сек',
      difficulty: 'easy',
      icon: 'zap',
      color: 'var(--color-warning)'
    },
    {
      id: 'expert',
      title: 'Экспертная дуэль',
      description: '15 сложных вопросов',
      time: '3-4 мин',
      difficulty: 'hard',
      icon: 'brain',
      color: 'var(--color-danger)'
    },
    {
      id: 'versus',
      title: 'Соревнование',
      description: 'Соревнуйся с друзьями',
      time: '2-3 мин',
      difficulty: 'normal',
      icon: 'users',
      color: 'var(--color-info)',
      comingSoon: true
    }
  ];

  const difficultyText = {
    easy: 'Легкая',
    normal: 'Средняя',
    hard: 'Сложная'
  };

  const difficultyColors = {
    easy: 'var(--color-success)',
    normal: 'var(--color-warning)',
    hard: 'var(--color-danger)'
  };

  return (
    <div className="start-screen">
      {/* Header */}
      <div className="start-header">
        <Button
          variant="ghost"
          size="small"
          icon="arrowLeft"
          onClick={onHome}
          className="back-button"
        >
          Назад
        </Button>
        
        <div className="start-title">
          <Icon name="target" size={32} className="title-icon" />
          <h1>Режимы игры</h1>
          <p className="subtitle">Выбери тип дуэли и испытай свои знания</p>
        </div>
      </div>

      {/* Score Card */}
      <Card variant="gradient" className="score-card">
        <div className="score-content">
          <Icon name="trophy" size={48} className="score-icon" />
          <div className="score-details">
            <div className="score-label">Твой общий счет</div>
            <div className="score-value">{score.toLocaleString()}</div>
            <div className="score-rank">Ранг: Чемпион</div>
          </div>
        </div>
      </Card>

      {/* Game Modes */}
      <div className="game-modes-section">
        <h2 className="section-title">Выбери режим игры</h2>
        <p className="section-description">Каждый режим предлагает уникальный вызов</p>

        <div className="game-modes-grid">
          {gameModes.map((mode) => (
            <Card
              key={mode.id}
              variant="glass"
              className={`game-mode-card ${mode.comingSoon ? 'coming-soon' : ''}`}
              hoverable={!mode.comingSoon}
              onClick={mode.comingSoon ? undefined : () => onStart({ mode: mode.id, difficulty: mode.difficulty })}
            >
              {mode.comingSoon && (
                <div className="coming-soon-badge">Скоро</div>
              )}
              
              <div className="mode-header">
                <div className="mode-icon" style={{ backgroundColor: `${mode.color}20` }}>
                  <Icon name={mode.icon} size={24} color={mode.color} />
                </div>
                <h3 className="mode-title">{mode.title}</h3>
              </div>
              
              <p className="mode-description">{mode.description}</p>
              
              <div className="mode-stats">
                <div className="mode-stat">
                  <Icon name="timer" size={16} />
                  <span className="stat-label">Время:</span>
                  <span className="stat-value">{mode.time}</span>
                </div>
                <div className="mode-stat">
                  <Icon name="target" size={16} />
                  <span className="stat-label">Сложность:</span>
                  <span 
                    className="stat-value difficulty"
                    style={{ color: difficultyColors[mode.difficulty] }}
                  >
                    {difficultyText[mode.difficulty]}
                  </span>
                </div>
              </div>
              
              <Button
                variant={mode.comingSoon ? 'tertiary' : 'primary'}
                size="medium"
                icon={mode.comingSoon ? 'lock' : 'play'}
                onClick={mode.comingSoon ? undefined : () => onStart({ mode: mode.id, difficulty: mode.difficulty })}
                disabled={mode.comingSoon}
                className="mode-button"
              >
                {mode.comingSoon ? 'Скоро' : 'Начать'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Button
          variant="secondary"
          size="large"
          icon="settings"
          onClick={onSettings}
          className="quick-action-button"
        >
          Настройки
        </Button>
        
        <Button
          variant="tertiary"
          size="large"
          icon="barChart"
          className="quick-action-button"
        >
          Таблица лидеров
        </Button>
      </div>

      {/* Stats Preview */}
      <div className="stats-preview">
        <div className="stat-preview">
          <Icon name="globe" size={24} />
          <div className="stat-preview-content">
            <div className="stat-preview-value">5+</div>
            <div className="stat-preview-label">тематик</div>
          </div>
        </div>
        
        <div className="stat-preview">
          <Icon name="helpCircle" size={24} />
          <div className="stat-preview-content">
            <div className="stat-preview-value">50+</div>
            <div className="stat-preview-label">вопросов</div>
          </div>
        </div>
        
        <div className="stat-preview">
          <Icon name="infinity" size={24} />
          <div className="stat-preview-content">
            <div className="stat-preview-value">∞</div>
            <div className="stat-preview-label">комбинаций</div>
          </div>
        </div>
      </div>

      {/* Current Settings */}
      <Card variant="default" className="current-settings">
        <div className="settings-info">
          <Icon name="settings" size={20} />
          <div className="settings-text">
            <div className="settings-title">Текущие настройки</div>
            <div className="settings-details">
              Сложность: <span style={{ color: difficultyColors[settings.difficulty] }}>
                {difficultyText[settings.difficulty]}
              </span> • Звук: {settings.sound ? 'Вкл' : 'Выкл'}
            </div>
          </div>
          <Button
            variant="ghost"
            size="small"
            icon="edit"
            onClick={onSettings}
          >
            Изменить
          </Button>
        </div>
      </Card>
    </div>
  );
}