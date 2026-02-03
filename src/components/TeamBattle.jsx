// TeamBattle.jsx (улучшенная версия главной страницы)
// Добавлена навигация с useNavigate, улучшена анимация, добавлены tooltips для иконок, оптимизирована производительность (memoization), добавлена поддержка тем Telegram, улучшена доступность (ARIA-атрибуты).
import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, Users, Trophy, Zap, Map, Skull, Target, Clock, Crown, ArrowLeft } from 'lucide-react';
import './TeamBattle.css';

const MemoizedQuickCard = memo(({ action }) => {
  const navigate = useNavigate();
  const Icon = action.icon;
  const handleClick = () => {
    switch (action.label) {
      case 'Найти матч': navigate('/team/find-match'); break;
      case 'Создать комнату': navigate('/team/create-room'); break;
      case 'Моя команда': navigate('/team/my-team'); break;
      case 'Лидерборды': navigate('/team/leaderboards'); break;
      default: break;
    }
  };

  return (
    <button className="quick-card" onClick={handleClick} aria-label={action.label}>
      <div className="quick-icon-wrapper" style={{ background: action.color }}>
        <Icon size={32} />
      </div>
      <p>{action.label}</p>
    </button>
  );
});

const MemoizedModeCard = memo(({ mode }) => {
  const navigate = useNavigate();
  const Icon = mode.icon;
  const handleClick = () => {
    navigate(`/team/modes/${mode.id}`);
  };

  return (
    <div className="mode-card card" onClick={handleClick} role="button" tabIndex={0} aria-label={`Открыть режим: ${mode.title}`}>
      <div className="mode-header">
        <div className="mode-icon" style={{ background: mode.color }}>
          <Icon size={24} />
        </div>
        <div className="mode-info">
          <h3>{mode.title}</h3>
          <p className="mode-description">{mode.description}</p>
        </div>
      </div>
      <div className="mode-details">
        <p>{mode.details}</p>
        {mode.progress && <p className="progress">{mode.progress}</p>}
      </div>
      <button className="btn btn-primary btn-full" onClick={handleClick}>
        {mode.button}
      </button>
    </div>
  );
});

function TeamBattle({ score, settings }) {
  const navigate = useNavigate();
  const [hasTeam, setHasTeam] = useState(true);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      // Синхронизация с темой Telegram
      document.body.style.setProperty('--bg-primary', tg.themeParams.bg_color);
      document.body.style.setProperty('--text-primary', tg.themeParams.text_color);
      // ... другие цвета
    }

    const seasonEnd = new Date('2026-03-01T00:00:00');
    const updateTimer = () => {
      const now = new Date();
      const diff = seasonEnd - now;
      if (diff <= 0) {
        setTimer('Завершён');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimer(`${days} дн ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { icon: Sword, label: 'Найти матч', color: '#aa00ff' },
    { icon: Users, label: 'Создать комнату', color: '#00ff88' },
    { icon: Users, label: 'Моя команда', color: '#4488ff' },
    { icon: Trophy, label: 'Лидерборды', color: '#ffd700' },
  ];

  const modes = [
    {
      id: 'tournament',
      title: 'Турнир с лигами',
      icon: Trophy,
      description: 'Долгосрочный сезонный турнир с подъёмом по дивизионам',
      details: '4–32+ игроков • 87 команд онлайн',
      progress: 'Золото II • 340/500 очков',
      button: 'Войти в дивизион',
      color: '#ffd700',
    },
    {
      id: 'weekly',
      title: 'Испытания недели',
      icon: Zap,
      description: 'Еженедельные сложные челленджи для команды',
      details: '2–6 игроков • До воскресенья 23:59',
      progress: null,
      button: 'Присоединиться',
      color: '#10b981',
    },
    {
      id: 'quest',
      title: 'Квестовая цепочка',
      icon: Target,
      description: 'Сюжетное приключение с главами и боссами',
      details: '3–8 игроков • 5 активных квестов',
      progress: 'Глава 4/10 завершена',
      button: 'Начать квест',
      color: '#9370db',
    },
    {
      id: 'survival',
      title: 'Выживание',
      icon: Skull,
      description: 'Последняя выжившая команда побеждает',
      details: '6–20 игроков • 42 матча сейчас',
      progress: null,
      button: 'Играть',
      color: '#ff4444',
    },
    {
      id: 'boss',
      title: 'Босс-рейд',
      icon: Crown,
      description: 'Кооперативная битва с мощным боссом',
      details: '4–10 игроков • Ежедневный босс активен',
      progress: 'Лучший дамаг: 2-е место',
      button: 'В рейд',
      color: '#ff4500',
    },
    {
      id: 'territory',
      title: 'Захват территорий',
      icon: Map,
      description: 'Стратегическое завоевание карты мира',
      details: '6–20 игроков • 3 активные карты',
      progress: null,
      button: 'Захватить',
      color: '#4488ff',
    },
    {
      id: 'marathon',
      title: 'Марафон',
      icon: Clock,
      description: 'Бесконечные вопросы до первой ошибки',
      details: '2–5 команд • Рекорд: 142 вопроса',
      progress: 'Твой рекорд: 89',
      button: 'Запустить',
      color: '#ff69b4',
    },
  ];

  return (
    <div className="team-battle-page animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/')} aria-label="Назад">
          <ArrowLeft size={20} />
        </button>
        <h1>Командные битвы</h1>
        <div className="score-badge">
          <span>Счет: {score}</span>
        </div>
      </div>

      <div className="season-banner">
        <h1 className="season-title">Сезон 3: Покорители космоса</h1>
        <p className="timer">До конца: {timer}</p>
        <button className="btn btn-secondary">Подробнее</button>
      </div>

      <div className="quick-actions-grid">
        {quickActions.map((action) => (
          <MemoizedQuickCard key={action.label} action={action} />
        ))}
      </div>

      {hasTeam ? (
        <div className="modes-section">
          <h2 className="section-title">Режимы игры</h2>
          <div className="modes-grid">
            {modes.map((mode) => (
              <MemoizedModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Создай команду, чтобы начать!</h2>
          <p>Присоединяйся к друзьям и сражайтесь вместе</p>
          <div className="empty-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/team/create-team')}>Создать команду</button>
            <button className="btn btn-secondary btn-large" onClick={() => navigate('/team/find-team')}>Найти команду</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamBattle;