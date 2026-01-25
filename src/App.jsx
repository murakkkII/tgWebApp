import { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen/HomeScreen.jsx';
import StartScreen from './StartScreen/StartScreen.jsx';
import DuelScreen from './DuelScreen/DuelScreen.jsx';
import SettingsScreen from './SettingsScreen/SettingsScreen.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState({
    difficulty: 'normal',
    sound: true,
    theme: 'default',
    username: 'Игрок'
  });

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('quiz-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setSettings(prev => ({ ...prev, theme: savedTheme }));
    }
  }, []);

  const handleStart = () => {
    setCurrentScreen('start');
  };

  const handleStartDuel = (gameSettings) => {
    setCurrentScreen('duel');
    setSettings(prev => ({ ...prev, ...gameSettings }));
  };

  const handleFinishDuel = (finalScore) => {
    setScore(prev => prev + finalScore);
    setCurrentScreen('start');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    
    if (newSettings.theme && newSettings.theme !== 'default') {
      document.documentElement.setAttribute('data-theme', newSettings.theme);
      localStorage.setItem('quiz-theme', newSettings.theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('quiz-theme');
    }
    
    setCurrentScreen('home');
  };

  const handleHome = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStart={handleStart} onSettings={handleSettings} />;
      case 'start':
        return <StartScreen onStart={handleStartDuel} onSettings={handleSettings} score={score} onHome={handleHome} />;
      case 'duel':
        return <DuelScreen onFinish={handleFinishDuel} settings={settings} onHome={handleHome} />;
      case 'settings':
        return <SettingsScreen onSave={handleSaveSettings} onBack={() => setCurrentScreen('home')} initialSettings={settings} onHome={handleHome} />;
      default:
        return <HomeScreen onStart={handleStart} onSettings={handleSettings} />;
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
}