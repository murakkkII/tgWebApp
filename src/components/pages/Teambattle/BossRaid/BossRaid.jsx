// BossRaid.jsx (Босс-рейд)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';

function BossRaid() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Босс-рейд</h1>
      </div>
      <div className="content">
        <p>Кооперативная битва с мощным боссом. 4–10 игроков • Ежедневный босс активен.</p>
        <p>Прогресс: Лучший дамаг: 2-е место</p>
        <button className="btn btn-primary btn-full">В рейд</button>
      </div>
    </div>
  );
}
export default BossRaid;
