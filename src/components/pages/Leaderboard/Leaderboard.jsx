import React from 'react';
import { Trophy, Crown, User, ChevronRight, Target, TrendingUp } from 'lucide-react';
import './Leaderboard.css';

export default function Leaderboard({ leaderboard = [], currentUserId }) {
  const data = leaderboard.length ? leaderboard : [
    { id: '1', name: 'tw1xx1ee', score: 12450, rank: 1, progress: '+12%' },
    { id: '2', name: 'ProGamer228', score: 11890, rank: 2, progress: '+8%' },
    { id: '3', name: 'BrainStorm', score: 10980, rank: 3, progress: '+5%' },
    { id: '4', name: 'QuizMaster', score: 9870, rank: 4, progress: '-2%' },
    { id: '5', name: 'FastFinger', score: 8920, rank: 5, progress: '+15%' },
    { id: '6', name: 'KnowledgeKing', score: 8100, rank: 6, progress: '+3%' },
    { id: '7', name: 'DuelGod', score: 7450, rank: 7, progress: '+7%' },
  ];

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);
  const currentUserIndex = data.findIndex(player => player.id === currentUserId);
  const currentUser = currentUserIndex !== -1 ? data[currentUserIndex] : null;

  return (
    <div className="leaderboard-screen">
      <div className="leaderboard-container">
        {/* Десктопная версия */}
        <div className="desktop-version">
          {/* Заголовок */}
          <div className="leaderboard-header">
            <div className="header-content">
              <div className="title-section">
                <Trophy size={28} className="title-icon" />
                <h1>Лидеры</h1>
              </div>
              <p className="subtitle">Топ игроков по результатам</p>
            </div>
            
            {currentUser && (
              <div className="current-user-card card">
                <div className="current-user-info">
                  <div className="current-rank">
                    <span className="rank-number">#{currentUser.rank}</span>
                    <TrendingUp size={16} />
                  </div>
                  <div className="current-user-details">
                    <div className="current-name">
                      <User size={16} />
                      <span>{currentUser.name}</span>
                      <span className="you-badge">Вы</span>
                    </div>
                    <div className="current-score">{currentUser.score.toLocaleString()} очков</div>
                  </div>
                </div>
                <ChevronRight size={20} className="chevron" />
              </div>
            )}
          </div>

          {/* Пьедестал топ-3 */}
          <div className="podium-section">
            <div className="section-label">
              <Crown size={20} />
              <span>Лидеры пьедестала</span>
            </div>
            
            <div className="podium-cards">
              {top3.map((player, index) => (
                <div 
                  key={player.id} 
                  className={`podium-card card rank-${index + 1} ${player.id === currentUserId ? 'current-user-card' : ''}`}
                >
                  <div className="podium-badge">
                    {index === 0 && <div className="crown-badge">👑</div>}
                    <div className={`rank-badge rank-${index + 1}`}>#{index + 1}</div>
                  </div>
                  
                  <div className="player-avatar">
                    <div className="avatar-circle">
                      <User size={24} />
                    </div>
                    {player.id === currentUserId && <div className="you-indicator"></div>}
                  </div>
                  
                  <div className="player-info">
                    <h3 className="player-name">{player.name}</h3>
                    <div className="player-score">
                      <Target size={16} />
                      <span>{player.score.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {player.progress && (
                    <div className={`progress-badge ${player.progress.startsWith('+') ? 'positive' : 'negative'}`}>
                      {player.progress}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Остальные участники */}
          <div className="players-section">
            <div className="section-label">
              <TrendingUp size={20} />
              <span>Все участники</span>
            </div>
            
            <div className="players-list">
              {rest.map((player) => (
                <div 
                  key={player.id} 
                  className={`player-row card ${player.id === currentUserId ? 'current-user-row' : ''}`}
                >
                  <div className="row-rank">
                    <span className={`rank-number rank-${player.rank}`}>#{player.rank}</span>
                  </div>
                  
                  <div className="row-avatar">
                    <div className="avatar-small">
                      <User size={16} />
                    </div>
                  </div>
                  
                  <div className="row-info">
                    <div className="row-name">
                      {player.name}
                      {player.id === currentUserId && <span className="you-badge-small">Вы</span>}
                    </div>
                    <div className="row-score">{player.score.toLocaleString()}</div>
                  </div>
                  
                  {player.progress && (
                    <div className={`row-progress ${player.progress.startsWith('+') ? 'positive' : 'negative'}`}>
                      {player.progress}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="stats-footer card">
            <div className="stats-item">
              <div className="stats-value">{data.length}</div>
              <div className="stats-label">Участников</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <div className="stats-value">{Math.max(...data.map(p => p.score)).toLocaleString()}</div>
              <div className="stats-label">Макс. очки</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <div className="stats-value">{Math.round(data.reduce((a, b) => a + b.score, 0) / data.length).toLocaleString()}</div>
              <div className="stats-label">Средний результат</div>
            </div>
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="mobile-version">
          <div className="mobile-header">
            <div className="header-icon">
              <Trophy size={24} />
            </div>
            <div>
              <h1>Лидеры</h1>
              <p className="mobile-subtitle">Топ игроков</p>
            </div>
          </div>
          
          {currentUser && (
            <div className="mobile-user-card">
              <div className="mobile-user-rank">#{currentUser.rank}</div>
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  <User size={14} />
                </div>
                <div>
                  <div className="mobile-username">{currentUser.name}</div>
                  <div className="mobile-userscore">{currentUser.score.toLocaleString()}</div>
                </div>
              </div>
              <ChevronRight size={18} className="mobile-chevron" />
            </div>
          )}

          {/* Пьедестал */}
          <div className="mobile-podium">
            <div className="podium-title">
              <Crown size={18} />
              <span>Топ-3</span>
            </div>
            
            <div className="podium-compact">
              {top3.map((player, index) => (
                <div 
                  key={player.id} 
                  className={`podium-compact-card ${player.id === currentUserId ? 'current-mobile' : ''}`}
                >
                  <div className="compact-rank">#{index + 1}</div>
                  <div className="compact-avatar">
                    <div className={`avatar-compact rank-${index + 1}`}>
                      <User size={16} />
                    </div>
                  </div>
                  <div className="compact-info">
                    <div className="compact-name">{player.name}</div>
                    <div className="compact-score">
                      <Target size={12} />
                      <span>{player.score.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className={`compact-progress ${player.progress.startsWith('+') ? 'positive' : 'negative'}`}>
                    {player.progress}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Список игроков */}
          <div className="mobile-players">
            <div className="players-title">
              <TrendingUp size={18} />
              <span>Все игроки</span>
            </div>
            
            <div className="players-compact-list">
              {rest.map((player) => (
                <div 
                  key={player.id} 
                  className={`player-compact-row ${player.id === currentUserId ? 'current-mobile-row' : ''}`}
                >
                  <div className="player-rank">#{player.rank}</div>
                  <div className="player-avatar-compact">
                    <div className="avatar-tiny">
                      <User size={12} />
                    </div>
                  </div>
                  <div className="player-details">
                    <div className="player-name-compact">
                      {player.name}
                      {player.id === currentUserId && <span className="mobile-you">Вы</span>}
                    </div>
                    <div className="player-score-compact">{player.score.toLocaleString()}</div>
                  </div>
                  <div className={`player-progress-compact ${player.progress.startsWith('+') ? 'positive' : 'negative'}`}>
                    {player.progress}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="mobile-stats">
            <div className="stat-item-compact">
              <div className="stat-value-compact">{data.length}</div>
              <div className="stat-label-compact">Игроков</div>
            </div>
            <div className="stat-divider-compact"></div>
            <div className="stat-item-compact">
              <div className="stat-value-compact">{Math.max(...data.map(p => p.score)).toLocaleString().slice(0, 5)}</div>
              <div className="stat-label-compact">Макс</div>
            </div>
            <div className="stat-divider-compact"></div>
            <div className="stat-item-compact">
              <div className="stat-value-compact">{Math.round(data.reduce((a, b) => a + b.score, 0) / data.length).toLocaleString().slice(0, 4)}</div>
              <div className="stat-label-compact">Средний</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}