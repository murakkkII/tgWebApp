// BossRaid.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sword, Skull, Users, Clock, Zap, Crown, ArrowLeft } from 'lucide-react';
import './BossRaid.css';

const fakePlayers = [
  { id: 1, name: "xSlaughteR", avatar: "https://i.imgur.com/abc123.png", damage: 0, ready: true },
  { id: 2, name: "NeonKiller99", avatar: null, damage: 0, ready: false },
  { id: 3, name: "RageQueen",    avatar: "https://i.imgur.com/xyz789.png", damage: 0, ready: true },
  { id: 4, name: "PhantomX",     avatar: null, damage: 0, ready: true },
  { id: 5, name: "你死定了",       avatar: null, damage: 0, ready: false },
  { id: 6, name: "BLOODxSHOT",   avatar: "https://i.imgur.com/def456.png", damage: 0, ready: true },
];

const currentBoss = {
  name: "DEATHSCYTHE",
  avatar: "https://i.imgur.com/boss-skull-neon.png", // замени на реальную
  level: 85,
  hp: 12_450_000,
};

export default function BossRaid() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('welcome'); // welcome → lobby → vote → fight
  const [voteTime, setVoteTime] = useState(5);
  const [myVote, setMyVote] = useState(null);

  // ─── таймер голосования ───
  useEffect(() => {
    if (screen !== 'vote') return;
    if (voteTime <= 0) {
      setScreen('fight');
      return;
    }
    const t = setTimeout(() => setVoteTime(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, voteTime]);

  const handleEnterRaid = () => setScreen('lobby');

  const handleVote = (type) => {
    setMyVote(type);
    // можно сразу завершить голосование для теста
    // setTimeout(() => setScreen('fight'), 800);
  };

  return (
    <div className="boss-raid-page">

      {/* Фон + частицы / glitch-эффект можно добавить в css */}
      <div className="bg-neon-grid" />

      {screen === 'welcome' && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="glitch" data-text="ВРЕМЯ УБИВАТЬ">
              ВРЕМЯ УБИВАТЬ
            </h1>
            <p className="subtitle">Босс-рейд уже ждёт твоей ярости</p>

            <button className="btn btn-enter" onClick={handleEnterRaid}>
              <Zap size={28} />
              ВРЫВАЕМСЯ
            </button>

            <button className="btn-back" onClick={() => navigate(-1)}>
              <ArrowLeft /> назад
            </button>
          </div>
        </div>
      )}

      {screen === 'lobby' && (
        <>
          <header className="lobby-header">
            <button className="btn-back" onClick={() => setScreen('welcome')}>
              <ArrowLeft />
            </button>
            <h2>Босс: <span className="boss-name">{currentBoss.name}</span></h2>
          </header>

          <div className="boss-preview">
            <img src={currentBoss.avatar} alt="boss" className="boss-avatar" />
            <div className="boss-info">
              Уровень {currentBoss.level} • HP {currentBoss.hp.toLocaleString()}
            </div>
          </div>

          <div className="players-grid">
            {fakePlayers.map(p => (
              <div key={p.id} className={`player-card ${p.ready ? 'ready' : ''}`}>
                <div className="avatar-wrapper">
                  {p.avatar ? (
                    <img src={p.avatar} alt={p.name} />
                  ) : (
                    <div className="no-avatar">{p.name[0]}</div>
                  )}
                  {p.ready && <div className="ready-badge">READY</div>}
                </div>
                <div className="player-name">{p.name}</div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-start"
            onClick={() => setScreen('vote')}
            disabled={fakePlayers.filter(p => p.ready).length < 3}
          >
            <Clock size={20} />
            НАЧАТЬ ГОЛОСОВАНИЕ
          </button>
        </>
      )}

      {screen === 'vote' && (
        <div className="vote-screen">
          <h2 className="vote-title">КТО ВЫНЕСЕТ БОЛЬШЕ ВСЕХ?</h2>
          <div className="timer-big">{voteTime}</div>

          <div className="vote-buttons">
            <button
              className={`btn-vote ${myVote === 'solo' ? 'selected' : ''}`}
              onClick={() => handleVote('solo')}
              disabled={!!myVote}
            >
              Я ОДИН ВЫНЕСУ ЭТУ ТВАРЬ
            </button>

            <button
              className={`btn-vote ${myVote === 'team' ? 'selected' : ''}`}
              onClick={() => handleVote('team')}
              disabled={!!myVote}
            >
              ВМЕСТЕ РАЗЪЕБЁМ
            </button>
          </div>

          <p className="vote-hint">Осталось {voteTime} сек...</p>
        </div>
      )}

      {screen === 'fight' && (
        <div className="fight-screen">
          <h1>БИТВА НАЧАЛАСЬ</h1>
          <p>Сейчас будет лютый замес...</p>
          {/* здесь уже будет игровое поле, hp босса, урон и т.д. */}
        </div>
      )}

    </div>
  );
}