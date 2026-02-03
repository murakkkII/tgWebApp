// MyTeam.jsx (Моя команда)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';

function MyTeam() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Моя команда</h1>
      </div>
      <div className="content">
        <p>Управляйте своей командой: добавляйте игроков, просматривайте статистику.</p>
        <div className="team-stats">
          <p>Участники: 5/8</p>
          <p>Очки: 1200</p>
        </div>
        <button className="btn btn-primary"><Users size={20} /> Пригласить друга</button>
      </div>
    </div>
  );
}
export default MyTeam;