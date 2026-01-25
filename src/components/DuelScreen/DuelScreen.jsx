import { useState, useEffect, useCallback } from 'react';
import Question from "../Question/Question"; // Или "../../Question/Question"
import questionsData from '../../data/questions'; // ← Исправленный импорт
import './DuelScreen.css';


export default function DuelScreen({ onFinish, settings, onHome }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    settings.difficulty === 'easy' ? 20 : settings.difficulty === 'hard' ? 10 : 15
  );
  const [gameOver, setGameOver] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [lastScoreChange, setLastScoreChange] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [activeNav, setActiveNav] = useState('duel');

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('quiz-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Randomly select a topic on component mount
  useEffect(() => {
    const topics = Object.keys(questionsData);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setSelectedTopic(randomTopic);
  }, []);

  const questions = selectedTopic ? questionsData[selectedTopic] : [];

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || gameOver || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          nextQuestion(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, gameOver, showResult]);

  const topicNames = {
    geography: '🌍 География',
    history: '🏛️ История', 
    science: '🔬 Наука',
    sports: '⚽ Спорт',
    entertainment: '🎬 Развлечения'
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('quiz-theme', newTheme);
  };

  const handleAnswer = useCallback((isCorrect) => {
    if (showResult) return;
    
    setShowResult(true);
    let scoreChange = 0;
    
    if (isCorrect) {
      scoreChange = 10 + timeLeft; // + бонус за скорость
      setScore(prev => prev + scoreChange);
      setLastScoreChange(scoreChange);
    }
    
    // Show score popup
    setShowScorePopup(true);
    setTimeout(() => setShowScorePopup(false), 1500);
    
    // Go to next question
    setTimeout(() => {
      nextQuestion(isCorrect);
    }, 2000);
  }, [showResult, timeLeft]);

  const nextQuestion = useCallback((answered = true) => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setGameOver(true);
      setTimeout(() => onFinish(score), 300);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(
        settings.difficulty === 'easy' ? 20 : 
        settings.difficulty === 'hard' ? 10 : 15
      );
      setSelectedAnswer(null);
      setShowResult(false);
      setLastScoreChange(0);
    }
  }, [currentQuestionIndex, questions.length, settings.difficulty, onFinish, score]);

  const calculateStats = () => {
    const totalTime = settings.difficulty === 'easy' ? 20 : settings.difficulty === 'hard' ? 10 : 15;
    const timeUsed = totalTime - timeLeft;
    const accuracy = currentQuestionIndex === 0 ? 0 : Math.round((score / (currentQuestionIndex * (totalTime + 10))) * 100);
    
    return { timeUsed, accuracy };
  };

  const { timeUsed, accuracy } = calculateStats();

  if (gameOver) {
    const performanceLevel = score >= 200 ? '🔥 Легенда' : 
                            score >= 150 ? '⭐ Мастер' : 
                            score >= 100 ? '🎯 Эксперт' : 
                            score >= 50 ? '👍 Продвинутый' : '🎓 Начинающий';

    return (
      <div className="game-over-screen">
        {/* Score Popup */}
        {showScorePopup && lastScoreChange > 0 && (
          <div className="score-popup">+{lastScoreChange}</div>
        )}
        
        <div className="game-over-card">
          <div className="game-over-icon">🏆</div>
          
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Дуэль Завершена!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '40px' }}>
            Отличная работа! Вот твои результаты:
          </p>
          
          <div className="result-score">
            <p className="score-figure">{score}</p>
            <p className="score-description">набранных очков</p>
          </div>
          
          <div className="performance-badge">
            {performanceLevel}
          </div>
          
          <div className="achievements">
            <div className="achievement">
              <div className="achievement-icon">🎯</div>
              <div className="achievement-value">{currentQuestionIndex + 1}</div>
              <div className="achievement-label">Вопросов</div>
            </div>
            
            <div className="achievement">
              <div className="achievement-icon">⚡</div>
              <div className="achievement-value">{Math.round(score / (currentQuestionIndex + 1)) || 0}</div>
              <div className="achievement-label">Очков/вопрос</div>
            </div>
            
            <div className="achievement">
              <div className="achievement-icon">✅</div>
              <div className="achievement-value">{accuracy}%</div>
              <div className="achievement-label">Точность</div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => onFinish(score)}>
              <span className="btn-icon">←</span> Вернуться в меню
            </button>
            <button className="btn btn-secondary" onClick={() => window.location.reload()}>
              <span className="btn-icon">🔄</span> Сыграть снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isTimerWarning = timeLeft <= 5;
  const timerPercentage = (timeLeft / (settings.difficulty === 'easy' ? 20 : settings.difficulty === 'hard' ? 10 : 15)) * 100;

  return (
    <div className="duel-screen">
      {/* Score Popup */}
      {showScorePopup && lastScoreChange > 0 && (
        <div className="score-popup">+{lastScoreChange}</div>
      )}
      
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">QuizDuel</div>
          <div 
            className={`nav-item ${activeNav === 'duel' ? 'active' : ''}`}
            onClick={() => setActiveNav('duel')}
          >
            ⚔️ Дуэль
          </div>
        </div>
        
        <div className="nav-center">
          <div 
            className={`nav-item ${activeNav === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveNav('stats')}
          >
            📊 Статистика
          </div>
          <div 
            className={`nav-item ${activeNav === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveNav('leaderboard')}
          >
            🏆 Таблица лидеров
          </div>
        </div>
        
        <div className="nav-right">
          <div className="nav-item">
            👤 {settings.username || 'Игрок'}
          </div>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Переключить тему"
          />
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="game-container">
          {/* Game Header */}
          <div className="game-header">
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <span>{currentQuestionIndex + 1}/{questions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <span>{timeUsed}с</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📈</span>
                <span>{accuracy}%</span>
              </div>
            </div>
            
            <div className="topic-badge">
              {topicNames[selectedTopic] || 'Загрузка...'}
            </div>
            
            <div className={`timer-container ${isTimerWarning ? 'warning' : ''}`}>
              <div className="timer-visual">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <defs>
                    <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isTimerWarning ? "#ff4757" : "#00d4ff"} />
                      <stop offset="100%" stopColor={isTimerWarning ? "#ff3838" : "#0088ff"} />
                    </linearGradient>
                  </defs>
                  <circle 
                    cx="30" 
                    cy="30" 
                    r="25" 
                    className="timer-circle-bg"
                  />
                  <circle 
                    cx="30" 
                    cy="30" 
                    r="25" 
                    className="timer-circle-fg"
                    strokeDasharray="157"
                    strokeDashoffset={157 - (timerPercentage * 1.57)}
                  />
                </svg>
              </div>
              
              <div className="timer-content">
                <div className="timer-value">{timeLeft}</div>
                <div className="timer-label">секунд</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-track">
              <div 
                className="progress-bar" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>Начало</span>
              <span>Прогресс: {Math.round(progressPercentage)}%</span>
              <span>Финиш</span>
            </div>
          </div>
          
          {/* Question Container */}
          <div className="question-container">
            <div className="question-header">
              <div className="question-number">
                {currentQuestionIndex + 1}
              </div>
              <h2 className="question-text">
                {questions.length > 0 ? currentQuestion.question : 'Загрузка вопроса...'}
              </h2>
            </div>
            
            {questions.length > 0 ? (
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                correctIndex={currentQuestion.correctIndex}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                setSelectedAnswer={setSelectedAnswer}
                timeLeft={timeLeft}
              />
            ) : (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Загрузка вопросов...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Score Display */}
      <div className="score-display">
        <div className="score-value">
          <span>🏆</span>
          {score}
        </div>
        <div className="score-label">Текущий счет</div>
      </div>
      
      {/* Difficulty Indicator */}
      <div className="difficulty-indicator">
        <div className={`difficulty-dot ${settings.difficulty}`}></div>
        <span className="difficulty-text">
          Сложность: {settings.difficulty === 'easy' ? 'Легкая' : 
                     settings.difficulty === 'hard' ? 'Сложная' : 'Средняя'}
        </span>
      </div>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={`nav-button ${activeNav === 'duel' ? 'active' : ''}`}
          onClick={() => setActiveNav('duel')}
        >
          <span className="nav-icon">⚔️</span>
          <span className="nav-label">Дуэль</span>
        </button>
        
        <button 
          className={`nav-button ${activeNav === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveNav('stats')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Статы</span>
        </button>
        
        <button 
          className={`nav-button ${activeNav === 'home' ? 'active' : ''}`}
          onClick={onHome}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Главная</span>
        </button>
        
        <button 
          className={`nav-button ${activeNav === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveNav('settings')}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Настройки</span>
        </button>
        
        <button 
          className={`nav-button ${activeNav === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveNav('profile')}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-label">Профиль</span>
        </button>
      </nav>
    </div>
  );
}