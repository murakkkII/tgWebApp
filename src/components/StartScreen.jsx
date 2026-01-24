export default function StartScreen({ onStart, onSettings, score, onHome }) {
  return (
    <div className="start-screen">
      <button className="home-btn" onClick={onHome}>
        🏠
      </button>
      <h1>🎯 DuelQuiz</h1>
      <p>Дружеские дуэли знаний на скорость ⚡</p>
      
      <div className="score">
        🏆 Твои очки: <strong>{score}</strong>
      </div>

      <button className="btn primary" onClick={onStart}>
        🚀 Начать дуэль 1×1
      </button>

      <button className="btn secondary">
        📊 Лидерборд (скоро)
      </button>

      <button className="btn tertiary" onClick={onSettings}>
        ⚙️ Настройки
      </button>
    </div>
  )
}