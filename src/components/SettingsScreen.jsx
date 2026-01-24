import { useState } from 'react'

export default function SettingsScreen({ onSave, onBack, initialSettings, onHome }) {
  const [settings, setSettings] = useState(initialSettings)

  const handleSave = () => {
    onSave(settings)
  }

  return (
    <div className="settings-screen">
      <button className="home-btn" onClick={onHome}>
        🏠
      </button>
      <h1>⚙️ Настройки</h1>
      <p>Настрой игру под себя</p>

      <div className="setting-group">
        <h3>🎚️ Сложность</h3>
        <select
          value={settings.difficulty}
          onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
          className="setting-select"
        >
          <option value="easy">Легко (20 сек)</option>
          <option value="normal">Нормально (15 сек)</option>
          <option value="hard">Сложно (10 сек)</option>
        </select>
      </div>

      <div className="setting-group">
        <h3>🔊 Звук</h3>
        <label className="toggle">
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={(e) => setSettings({ ...settings, sound: e.target.checked })}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-group">
        <h3>🎨 Тема</h3>
        <select
          value={settings.theme || 'default'}
          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          className="setting-select"
        >
          <option value="default">По умолчанию</option>
          <option value="dark">Темная</option>
          <option value="light">Светлая</option>
        </select>
      </div>

      <button className="btn primary" onClick={handleSave}>
        💾 Сохранить
      </button>

      <button className="btn secondary" onClick={onBack}>
        🔙 Назад
      </button>
    </div>
  )
}