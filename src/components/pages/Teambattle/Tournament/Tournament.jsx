// Tournament.jsx (Турнир с лигами)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

function Tournament() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Турнир с лигами</h1>
      </div>
      <div className="content">
        <p>Долгосрочный сезонный турнир с подъёмом по дивизионам. 4–32+ игроков • 87 команд онлайн.</p>
        <p>Прогресс: Золото II • 340/500 очков</p>
        <button className="btn btn-primary btn-full">Войти в дивизион</button>
        {/* Дополнительно: список матчей */}
      </div>
    </div>
  );
}
export default Tournament;