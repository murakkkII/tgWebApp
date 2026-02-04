import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Check, X, Target, Zap } from 'lucide-react';
import './DuelScreen.css';

function DuelScreen({ onFinish, settings, questionsData }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questions, setQuestions] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // Инициализация вопросов
  useEffect(() => {
    const allQuestions = Object.values(questionsData).flat();
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, settings.questionCount || 10);
    setQuestions(selected);
  }, [settings.questionCount]);

  // Таймер
  useEffect(() => {
    if (showResult || gameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(false);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showResult, gameFinished]);

  const handleAnswer = (isCorrect, index) => {
    setShowResult(true);
    
    if (isCorrect) {
      const points = Math.max(10, timeLeft * 2);
      setScore(prev => prev + points);
      setResultMessage({
        type: 'correct',
        title: 'Правильно!',
        message: `+${points} очков`,
        correctAnswer: null
      });
    } else {
      const correctAnswer = questions[currentQuestion].options[questions[currentQuestion].correctIndex];
      setResultMessage({
        type: 'wrong',
        title: 'Неверно',
        message: `Правильный ответ:`,
        correctAnswer: correctAnswer
      });
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
        setResultMessage('');
      } else {
        setGameFinished(true);
        setTimeout(() => {
          onFinish(score);
          navigate('/start');
        }, 3000);
      }
    }, 2000);
  };

  if (gameFinished) {
    return (
      <div className="duel-screen">
        <div className="game-finished card">
          <Trophy size={64} className="trophy-icon" />
          <h2>Игра завершена!</h2>
          <div className="final-score">{score}</div>
          <p>Отличный результат! Возвращаемся к выбору режима...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="duel-screen">
        <div className="loading card">
          <div className="loading-spinner"></div>
          <p>Загрузка вопросов...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isTimeCritical = timeLeft <= 5;
  const isTimeWarning = timeLeft <= 10 && timeLeft > 5;

  return (
    <div className="duel-screen animate-fade-in">
      {/* Шапка */}
      <div className="duel-header">
        <button className="back-btn" onClick={() => navigate('/start')}>
          <ArrowLeft size={20} />
        </button>
        
        <div className="header-info">
          <div className="question-counter">
            <Target size={16} />
            <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
          </div>
          
          <div className="score-display">
            <Trophy size={16} />
            <span>{score}</span>
          </div>
        </div>
      </div>

      {/* Таймер */}
      <div className="timer-section">
        <div className="timer-display">
          <Clock size={24} />
          <span className={`timer-value ${isTimeCritical ? 'critical' : isTimeWarning ? 'warning' : ''}`}>
            {timeLeft}
          </span>
          <span>сек</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${(timeLeft / 15) * 100}%`,
              background: isTimeCritical ? 'var(--error)' : 
                         isTimeWarning ? 'var(--warning)' : 'var(--success)'
            }}
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="duel-content">
        {/* Вопрос */}
        <div className="question-card card">
          <div className="question-header">
            <div className="question-category">
              <Zap size={16} />
              <span>{question.category}</span>
            </div>
            <div className="question-difficulty">
              Сложность: {question.difficulty}
            </div>
          </div>
          
          <h3 className="question-text">{question.question}</h3>
        </div>

        {/* Варианты ответов - симметричная сетка */}
        <div className="options-container">
          <div className="options-grid">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctIndex;
              const isWrongSelected = isSelected && !isCorrectAnswer;
              
              let className = 'option-card';
              if (showResult) {
                if (isCorrectAnswer) {
                  className += ' correct';
                } else if (isWrongSelected) {
                  className += ' wrong';
                } else {
                  className += ' disabled';
                }
              } else if (isSelected) {
                className += ' selected';
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => {
                    if (!showResult) {
                      setSelectedAnswer(index);
                      handleAnswer(isCorrectAnswer, index);
                    }
                  }}
                  disabled={showResult}
                >
                  <div className="option-number">{String.fromCharCode(65 + index)}</div>
                  <div className="option-content">
                    <div className="option-text">{option}</div>
                    <div className="option-status">
                      {showResult && isCorrectAnswer && (
                        <Check size={20} className="status-icon correct-icon" />
                      )}
                      {showResult && isWrongSelected && (
                        <X size={20} className="status-icon wrong-icon" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Карточка результата */}
        {showResult && resultMessage && (
          <div className={`result-card ${resultMessage.type}`}>
            <div className="result-card-content">
              <div className="result-icon">
                {resultMessage.type === 'correct' ? (
                  <Check size={48} />
                ) : (
                  <X size={48} />
                )}
              </div>
              
              <div className="result-text">
                <h3 className="result-title">{resultMessage.title}</h3>
                <p className="result-message">{resultMessage.message}</p>
                
                {resultMessage.correctAnswer && (
                  <div className="correct-answer">
                    <div className="answer-label">Правильный ответ:</div>
                    <div className="answer-text">{resultMessage.correctAnswer}</div>
                  </div>
                )}
                
                {resultMessage.type === 'correct' && (
                  <div className="points-earned">
                    <Trophy size={16} />
                    <span>{resultMessage.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Прогресс игры */}
        <div className="game-progress">
          <div className="progress-info">
            <div className="progress-text">
              Прогресс: {currentQuestion + 1}/{questions.length}
            </div>
            <div className="progress-percent">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DuelScreen;