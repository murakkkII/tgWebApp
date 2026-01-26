import React from 'react';
import { Trophy, Medal, Award, Crown, User } from 'lucide-react';
import './Leaderboard.css';

export default function Leaderboard({ leaderboard = [], currentUserId }) {
  // Тестовые данные — замени на свои
  const data = leaderboard.length ? leaderboard : [
    { id: '1', name: 'tw1xx1ee', score: 12450, rank: 1 },
    { id: '2', name: 'ProGamer228', score: 11890, rank: 2 },
    { id: '3', name: 'BrainStorm', score: 10980, rank: 3 },
    { id: '4', name: 'QuizMaster', score: 9870, rank: 4 },
    { id: '5', name: 'FastFinger', score: 8920, rank: 5 },
    { id: '6', name: 'KnowledgeKing', score: 8100, rank: 6 },
    { id: '7', name: 'DuelGod', score: 7450, rank: 7 },
  ];

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="leaderboard">
      <div className="header">
        <Crown size={32} className="crown-icon" />
        <h1>Лидерборд</h1>
        <p>Лучшие игроки за всё время</p>
      </div>

      {/* Пьедестал топ-3 */}
      <div className="podium">
        {top3.map((player, index) => {
          const heights = [140, 120, 100]; // высота пьедестала
          return (
            <div
              key={player.id}
              className={`podium-position rank-${index + 1} ${player.id === currentUserId ? 'current-user' : ''}`}
            >
              <div className="medal">
                {index === 0 && <Trophy size={40} className="gold" />}
                {index === 1 && <Medal size={40} className="silver" />}
                {index === 2 && <Award size={40} className="bronze" />}
              </div>

              <div className="avatar">
                <User size={48} />
              </div>

              <div className="name">
                {player.name}
                {player.id === currentUserId && <span className="you">ТЫ</span>}
              </div>

              <div className="score">{player.score.toLocaleString()}</div>

              <div className="podium-base" style={{ height: `${heights[index]}px` }}>
                <div className="rank-number">#{index + 1}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Таблица остальных */}
      <div className="table-container">
        {rest.map((player) => (
          <div
            key={player.id}
            className={`table-row ${player.id === currentUserId ? 'current-user' : ''}`}
          >
            <div className="rank">#{player.rank}</div>
            <div className="name">
              {player.name}
              {player.id === currentUserId && <span className="you">ТЫ</span>}
            </div>
            <div className="score">{player.score.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}