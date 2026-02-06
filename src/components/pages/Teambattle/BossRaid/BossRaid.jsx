// BossRaid.jsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Sword, Users, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import './BossRaid.css';

function BossRaid() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Создаем эффект частиц
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 1 + 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="page-container animate-fade-in">
      {/* Частицы на фоне */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.speed * 10}s infinite ease-in-out`
          }}
        />
      ))}
      
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Sword size={32} color="#8b5cf6" />
          <h1>Босс-рейд</h1>
          <Target size={32} color="#f59e0b" />
        </div>
      </div>
      
      <div className="content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <Crown size={24} color="#fbbf24" />
          <h2 style={{ 
            fontSize: '1.8rem', 
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            margin: 0
          }}>
            Ежедневный босс
          </h2>
        </div>
        
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Users size={20} />
          Кооперативная битва с мощным боссом. 4–10 игроков
        </p>
        
        <div style={{ 
          padding: '20px', 
          background: 'rgba(30, 41, 59, 0.4)', 
          borderRadius: '16px',
          margin: '30px 0',
          border: '1px solid rgba(100, 116, 139, 0.2)'
        }}>
          <p style={{ 
            color: '#fbbf24', 
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            margin: 0
          }}>
            <span style={{ fontSize: '2rem' }}>🥈</span>
            Лучший дамаг: 2-е место
          </p>
          <div style={{ 
            height: '8px', 
            background: 'rgba(100, 116, 139, 0.3)', 
            borderRadius: '4px',
            marginTop: '15px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '85%',
              height: '100%',
              background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
              borderRadius: '4px',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
            }} />
          </div>
        </div>
        
        <button className="btn btn-primary btn-full">
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Sword size={24} />
            Войти в рейд
          </span>
        </button>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: '#94a3b8', 
          textAlign: 'center', 
          marginTop: '20px',
          fontStyle: 'italic'
        }}>
          Босс обновляется ежедневно в 00:00
        </p>
      </div>
    </div>
  );
}

export default BossRaid;

