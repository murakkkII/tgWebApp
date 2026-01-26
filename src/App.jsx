import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { ParticleBackground } from './components/ParticleBackground'; // если используешь

import HomeScreen from './components/HomeScreen';
import StartScreen from './components/StartScreen';
import DuelScreen from './components/DuelScreen';
import SettingsScreen from './components/SettingsScreen';
import Leaderboard from './components/Leaderboard'; // ← добавляем новый компонент

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import { questionsData } from './data/questions';
import './index.css';

function AppContent() {
  const location = useLocation();

  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('quiz-score');
    return saved ? parseInt(saved) : 0;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('quiz-settings');
    return saved ? JSON.parse(saved) : {
      difficulty: 'normal',
      sound: true,
      theme: 'dark',
      username: 'Игрок',
      animations: true,
      vibration: true,
      volume: 80,
      notifications: true,
      questionCount: 10
    };
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('quiz-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setSettings(prev => ({ ...prev, theme: savedTheme }));
  }, []);

  const handleFinishDuel = (finalScore) => {
    const newScore = score + finalScore;
    setScore(newScore);
    localStorage.setItem('quiz-score', newScore.toString());
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    document.documentElement.setAttribute('data-theme', newSettings.theme);
    localStorage.setItem('quiz-theme', newSettings.theme);
    localStorage.setItem('quiz-settings', JSON.stringify(newSettings));
  };

  return (
    <div className="app">
      {/* { <ParticleBackground /> } */} {/* если используешь */}

      <Navbar
        currentScreen={location.pathname}
        score={score}
        settings={settings}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <HomeScreen score={score} settings={settings} />
          } />

          <Route path="/start" element={
            <StartScreen score={score} settings={settings} />
          } />

          <Route path="/duel" element={
            <DuelScreen
              onFinish={handleFinishDuel}
              settings={settings}
              questionsData={questionsData}
            />
          } />

          <Route path="/settings" element={
            <SettingsScreen
              onSave={handleSaveSettings}
              initialSettings={settings}
              onBack={() => window.history.back()}
            />
          } />

          {/* Новый маршрут — лидерборд */}
          <Route path="/leaderboard" element={
            <Leaderboard currentUserId="tw1xx1ee" />  // передай реальный ID пользователя
          } />
        </Routes>
      </main>

      {location.pathname !== '/duel' && (
        <BottomNav />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}