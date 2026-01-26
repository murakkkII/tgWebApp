// SettingsScreen.jsx
import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Gamepad,
  Volume2,
  Palette,
  Bell,
  Check,
  RefreshCw,
  VolumeX,
  Volume2 as Volume2Icon,
} from 'lucide-react';

import './SettingsScreen.css';

export default function SettingsScreen({ onSave, onBack, initialSettings }) {
  const [settings, setSettings] = useState(initialSettings || {
    username: 'Игрок',
    difficulty: 'normal',
    questionCount: 10,
    sound: true,
    volume: 80,
    animations: true,
    vibration: true,
    notifications: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    setIsSaving(true);
    try {
      await onSave(settings);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const reset = () => {
    setSettings({
      username: 'Игрок',
      difficulty: 'normal',
      questionCount: 10,
      sound: true,
      volume: 80,
      animations: true,
      vibration: true,
      notifications: true,
    });
  };

  return (
    <div className="settings-screen">
      <div className="header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>Настройки</h1>
      </div>

      <div className="content">
        <div className="setting">
          <label>Имя игрока</label>
          <input
            type="text"
            value={settings.username}
            onChange={(e) => setSettings({ ...settings, username: e.target.value })}
            placeholder="Ваше имя"
          />
        </div>

        <div className="setting">
          <label>Сложность</label>
          <div className="difficulty-buttons">
            <button
              className={settings.difficulty === 'easy' ? 'active' : ''}
              onClick={() => setSettings({ ...settings, difficulty: 'easy' })}
            >
              Лёгкая
            </button>
            <button
              className={settings.difficulty === 'normal' ? 'active' : ''}
              onClick={() => setSettings({ ...settings, difficulty: 'normal' })}
            >
              Нормальная
            </button>
            <button
              className={settings.difficulty === 'hard' ? 'active' : ''}
              onClick={() => setSettings({ ...settings, difficulty: 'hard' })}
            >
              Сложная
            </button>
          </div>
        </div>

        <div className="setting">
          <label>Вопросов в дуэли</label>
          <div className="slider-group">
            <input
              type="range"
              min="5"
              max="20"
              value={settings.questionCount}
              onChange={(e) => setSettings({ ...settings, questionCount: +e.target.value })}
            />
            <span>{settings.questionCount}</span>
          </div>
        </div>

        <div className="setting">
          <label>Звуковые эффекты</label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.sound}
              onChange={() => setSettings({ ...settings, sound: !settings.sound })}
            />
            <span className="toggle-track" />
          </label>
        </div>

        <div className="setting" style={{ opacity: settings.sound ? 1 : 0.5 }}>
          <label>Громкость</label>
          <div className="volume-row">
            <VolumeX size={18} />
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => setSettings({ ...settings, volume: +e.target.value })}
            />
            <Volume2Icon size={18} />
            <span>{settings.volume}%</span>
          </div>
        </div>

        <div className="setting">
          <label>Анимации</label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.animations}
              onChange={() => setSettings({ ...settings, animations: !settings.animations })}
            />
            <span className="toggle-track" />
          </label>
        </div>

        <div className="setting">
          <label>Вибрация</label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.vibration}
              onChange={() => setSettings({ ...settings, vibration: !settings.vibration })}
            />
            <span className="toggle-track" />
          </label>
        </div>

        <div className="setting">
          <label>Push-уведомления</label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => setSettings({ ...settings, notifications: !settings.notifications })}
            />
            <span className="toggle-track" />
          </label>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn reset-btn" onClick={reset} disabled={isSaving}>
          Сбросить
        </button>
        <button className="btn save-btn" onClick={save} disabled={isSaving}>
          {isSaving ? 'Сохраняется...' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
}