// QuestChain.jsx (Квестовая цепочка)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target } from 'lucide-react';

function QuestChain() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Квестовая цепочка</h1>
      </div>
      <div className="content">
        <p>Сюжетное приключение с главами и боссами. 3–8 игроков • 5 активных квестов.</p>
        <p>Прогресс: Глава 4/10 завершена</p>
        <button className="btn btn-primary btn-full">Начать квест</button>
      </div>
    </div>
  );
}
export default QuestChain;