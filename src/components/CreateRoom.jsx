// CreateRoom.jsx (Создать комнату)
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';

function CreateRoom() {
  const navigate = useNavigate();
  return (
    <div className="page-container animate-fade-in">
      <div className="start-header">
        <button className="back-btn" onClick={() => navigate('/team')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Создать комнату</h1>
      </div>
      <div className="content">
        <p>Создайте приватную комнату для игры с друзьями. Установите правила и пригласите участников.</p>
        <form className="create-form">
          <input type="text" placeholder="Название комнаты" aria-label="Название комнаты" />
          <select aria-label="Режим игры">
            <option>Выберите режим</option>
            <option>Выживание</option>
            <option>Турнир</option>
          </select>
          <button className="btn btn-primary"><Plus size={20} /> Создать</button>
        </form>
      </div>
    </div>
  );
}
export default CreateRoom;