// Survival.jsx (Выживание)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Skull } from 'lucide-react';

function Survival() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Выживание</h1>
      </div>
      <div className="content">
        <p>Последняя выжившая команда побеждает. 6–20 игроков • 42 матча сейчас.</p>
        <button className="btn btn-primary btn-full">Играть</button>
      </div>
    </div>
  );
}
export default Survival;

