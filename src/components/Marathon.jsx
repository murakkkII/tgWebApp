// Marathon.jsx (Марафон)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

function Marathon() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Марафон</h1>
      </div>
      <div className="content">
        <p>Бесконечные вопросы до первой ошибки. 2–5 команд • Рекорд: 142 вопроса.</p>
        <p>Прогресс: Твой рекорд: 89</p>
        <button className="btn btn-primary btn-full">Запустить</button>
      </div>
    </div>
  );
}
export default Marathon;