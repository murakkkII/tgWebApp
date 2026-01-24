export default function HomeScreen({ onStart, onSettings }) {
  return (
    <div className="home-screen">
      <h1>🎯 DuelQuiz</h1>
      <p>Добро пожаловать в мир интеллектуальных дуэлей! 🧠</p>
      <p>Соревнуйся с друзьями в викторинах по разным темам! ⚡</p>

      <div className="features">
        <div className="feature">
          <span className="emoji">🌍</span>
          <h3>5 тематик</h3>
          <p>География, История, Наука, Спорт, Развлечения</p>
        </div>
        <div className="feature">
          <span className="emoji">🎲</span>
          <h3>Случайная тема</h3>
          <p>Каждая дуэль по новой тематике</p>
        </div>
        <div className="feature">
          <span className="emoji">⏱️</span>
          <h3>Быстрые раунды</h3>
          <p>10 вопросов за ограниченное время</p>
        </div>
      </div>

      <button className="btn primary" onClick={onStart}>
        🚀 Начать игру
      </button>

      <button className="btn secondary" onClick={onSettings}>
        ⚙️ Настройки
      </button>
    </div>
  )
}