import { useEffect, useState } from 'react';
import './TeamBattle.css';

function TeamBattle({ score, settings }) {
  const [hasTeam, setHasTeam] = useState(true);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
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
      setTimer(`${days} дней ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { icon: '⚔️', color: '#aa00ff', label: 'Найти матч' },
    { icon: '➕', color: '#00ff88', label: 'Создать комнату' },
    { icon: '👥', color: '#4488ff', label: 'Моя команда' },
    { icon: '🏆', color: '#ffd700', label: 'Лидерборды' },
  ];

  const modes = [
    { icon: '🏆', color: '#ffd700', title: 'Турнир с лигами', desc: 'Долгосрочный сезонный турнир с подъёмом по дивизионам', details: '4–32+ игроков • 87 команд онлайн', progress: 'Золото II • 340/500 очков', button: 'Войти в дивизион' },
    { icon: '⚡', color: '#00ff88', title: 'Испытания недели', desc: 'Еженедельные сложные челленджи для команды', details: '2–6 игроков • До воскресенья 23:59', progress: null, button: 'Присоединиться' },
    { icon: '🗺️', color: '#9370db', title: 'Квестовая цепочка', desc: 'Сюжетное приключение с главами и боссами', details: '3–8 игроков • 5 активных квестов', progress: 'Глава 4/10 завершена', button: 'Начать квест' },
    { icon: '💀', color: '#ff4444', title: 'Выживание', desc: 'Последняя выжившая команда побеждает', details: '6–20 игроков • 42 матча сейчас', progress: null, button: 'Играть' },
    { icon: '👹', color: '#ff4500', title: 'Босс-рейд', desc: 'Кооперативная битва с мощным боссом', details: '4–10 игроков • Ежедневный босс активен', progress: 'Лучший дамаг: 2-е место', button: 'В рейд' },
    { icon: '🌍', color: '#4488ff', title: 'Захват территорий', desc: 'Стратегическое завоевание карты мира', details: '6–20 игроков • 3 активные карты', progress: null, button: 'Захватить' },
    { icon: '🏃', color: '#ff69b4', title: 'Марафон', desc: 'Бесконечные вопросы до первой ошибки', details: '2–5 команд • Рекорд: 142 вопроса', progress: 'Твой рекорд: 89', button: 'Запустить' },
  ];

  return (
    <div className="team-battle-page">
      {/* Баннер */}
      <div className="season-banner">
        <h1 className="season-title">Сезон 3: Покорители космоса</h1>
        <p className="timer">До конца: {timer}</p>
        <button className="details-btn">Подробнее</button>
      </div>

      {/* Быстрые действия 2x2 */}
      <div className="quick-actions-grid">
        {quickActions.map((action) => (
          <button key={action.label} className="quick-card">
            <div className="icon-square" style={{ backgroundColor: action.color }}>
              <span className="quick-icon">{action.icon}</span>
            </div>
            <p>{action.label}</p>
          </button>
        ))}
      </div>

      {/* Режимы с горизонтальным скроллом */}
      {hasTeam ? (
        <div className="modes-section">
          <h2 className="section-title">Режимы игры</h2>
          <div className="modes-horizontal-scroll">
            {modes.map((mode) => (
              <div key={mode.title} className="mode-card-horizontal">
                <div className="icon-square" style={{ backgroundColor: mode.color }}>
                  <span className="mode-icon">{mode.icon}</span>
                </div>
                <h3>{mode.title}</h3>
                <p className="desc">{mode.desc}</p>
                <p className="details">{mode.details}</p>
                {mode.progress && <p className="progress">{mode.progress}</p>}
                <button className="play-btn">{mode.button}</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Создай команду, чтобы начать!</h2>
          <p>Присоединяйся к друзьям и сражайтесь вместе</p>
          <button className="play-btn large">Создать команду</button>
          <button className="secondary-btn large">Найти команду</button>
        </div>
      )}
    </div>
  );
}

export default TeamBattle;