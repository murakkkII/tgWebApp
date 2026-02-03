// WeeklyChallenges.jsx (Испытания недели)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

function WeeklyChallenges() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Испытания недели</h1>
      </div>
      <div className="content">
        <p>Еженедельные сложные челленджи для команды. 2–6 игроков • До воскресенья 23:59.</p>
        <button className="btn btn-primary btn-full">Присоединиться</button>
        {/* Список челленджей */}
        <ul>
          <li>Челлендж 1: Ответьте на 50 вопросов</li>
        </ul>
      </div>
    </div>
  );
}
export default WeeklyChallenges;