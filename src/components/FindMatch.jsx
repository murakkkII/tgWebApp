// FindMatch.jsx (Найти матч)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

function FindMatch() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Найти матч</h1>
      </div>
      <div className="content">
        <p>Ищите подходящий матч для вашей команды. Укажите предпочтения и присоединяйтесь!</p>
        <div className="search-form">
          <input type="text" placeholder="Поиск по режиму или уровню" aria-label="Поиск матча" />
          <button className="btn btn-primary"><Search size={20} /> Найти</button>
        </div>
        {/* Placeholder для результатов */}
        <ul className="match-list">
          <li>Матч #1: Выживание • 6 игроков</li>
          <li>Матч #2: Турнир • 12 игроков</li>
        </ul>
      </div>
    </div>
  );
}
export default FindMatch;