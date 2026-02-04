import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomeScreen from './components/pages/HomeScreen/HomeScreen';
import StartScreen from './components/pages/StartScreen/StartScreen';
import DuelScreen from './components/pages/DuelScreen/DuelScreen';
import SettingsScreen from './components/pages/SettingsScreen/SettingsScreen';
import Leaderboard from './components/pages/Leaderboard/Leaderboard';
import AuthUserPage from './components/pages/UserAuthPage/UserAuthPage';
import TeamBattle from './components/pages/Teambattle/TeamBattle'; // ← Новый импорт
import Navbar from './components/ui/NavBar/Navbar';
import BottomNav from './components/ui/BottomNav/BottomNav';
import { questionsData } from './data/questions';
import './index.css';

/* ===== utils ===== */
const isAuthorized = () => !!localStorage.getItem('nickname');

/* ===== protected route ===== */
function ProtectedRoute({ children }) {
  return isAuthorized() ? children : <Navigate to="/" replace />;
}

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === '/';

  /* ===== state ===== */
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('quiz-score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('quiz-settings');
    return saved
      ? JSON.parse(saved)
      : {
          difficulty: 'normal',
          sound: true,
          theme: 'dark',
          username: 'Игрок',
          animations: true,
          vibration: true,
          volume: 80,
          notifications: true,
          questionCount: 10,
        };
  });

  useEffect(() => {
    const theme = localStorage.getItem('quiz-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    setSettings(prev => ({ ...prev, theme }));
  }, []);

  /* ===== handlers ===== */
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
      {/* Навигация скрыта ТОЛЬКО на входе */}
      {!hideNav && (
        <Navbar
          currentScreen={location.pathname}
          score={score}
          settings={settings}
        />
      )}

      <main className="main-content">
        <Routes>
          {/* ===== AUTH ===== */}
          <Route
            path="/"
            element={
              isAuthorized() ? (
                <Navigate to="/home" replace />
              ) : (
                <AuthUserPage />
              )
            }
          />

          {/* ===== PROTECTED ===== */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeScreen score={score} settings={settings} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/start"
            element={
              <ProtectedRoute>
                <StartScreen score={score} settings={settings} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/duel"
            element={
              <ProtectedRoute>
                <DuelScreen
                  onFinish={handleFinishDuel}
                  settings={settings}
                  questionsData={questionsData}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsScreen
                  onSave={handleSaveSettings}
                  initialSettings={settings}
                  onBack={() => window.history.back()}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard currentUserId="tw1xx1ee" />
              </ProtectedRoute>
            }
          />

          {/* ← Новый защищённый маршрут */}
          <Route
            path="/team-battle"
            element={
              <ProtectedRoute>
                <TeamBattle score={score} settings={settings} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* BottomNav скрыт на стартовом экране и в дуэли */}
      {!hideNav && location.pathname !== '/duel' && <BottomNav />}
    </div>
  );
}

/* ===== root ===== */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}