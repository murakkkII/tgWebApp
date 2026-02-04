// TerritoryCapture.jsx (Захват территорий)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map } from 'lucide-react';

function TerritoryCapture() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Захват территорий</h1>
      </div>
      <div className="content">
        <p>Стратегическое завоевание карты мира. 6–20 игроков • 3 активные карты.</p>
        <button className="btn btn-primary btn-full">Захватить</button>
        {/* Placeholder карта */}
      </div>
    </div>
  );
}
export default TerritoryCapture;
