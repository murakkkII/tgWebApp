import React from 'react';
import Button from '../UI/Button/Button';
import Icon from '../UI/Icon/Icon';
import './Question.css';

export default function Question({ 
  question, 
  options, 
  correctIndex, 
  onAnswer, 
  selectedAnswer, 
  showResult, 
  setSelectedAnswer,
  timeLeft 
}) {
  const handleClick = (index) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    onAnswer(index === correctIndex);
  };

  const getOptionClass = (index) => {
    if (!showResult) {
      return selectedAnswer === index ? 'option selected' : 'option';
    }
    
    if (index === correctIndex) {
      return 'option correct';
    }
    
    if (index === selectedAnswer && index !== correctIndex) {
      return 'option wrong';
    }
    
    return 'option disabled';
  };

  const getOptionLabel = (index) => {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index] || String.fromCharCode(65 + index);
  };

  const getFeedback = () => {
    if (!showResult) return null;
    
    return selectedAnswer === correctIndex ? {
      type: 'correct',
      icon: 'check',
      title: 'Правильно!',
      message: 'Отличный ответ!',
      color: 'var(--color-success)'
    } : {
      type: 'incorrect',
      icon: 'x',
      title: 'Неправильно!',
      message: `Правильный ответ: ${options[correctIndex]}`,
      color: 'var(--color-danger)'
    };
  };

  const feedback = getFeedback();

  return (
    <div className="question-component">
      {/* Question */}
      <div className="question-header">
        <h2 className="question-text">{question}</h2>
        {!showResult && timeLeft > 0 && (
          <div className="time-bonus-indicator">
            <Icon name="zap" size={16} />
            <span>+{timeLeft} за скорость</span>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleClick(index)}
          >
            <div className="option-content">
              <div className="option-label">{getOptionLabel(index)}</div>
              <div className="option-text">{option}</div>
            </div>
            
            {showResult && index === correctIndex && (
              <div className="option-status correct">
                <Icon name="check" size={20} />
              </div>
            )}
            
            {showResult && index === selectedAnswer && index !== correctIndex && (
              <div className="option-status wrong">
                <Icon name="x" size={20} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback */}
      {showResult && feedback && (
        <div className="feedback" style={{ '--feedback-color': feedback.color }}>
          <div className="feedback-header">
            <div className="feedback-icon">
              <Icon name={feedback.icon} size={24} />
            </div>
            <div className="feedback-content">
              <h3 className="feedback-title">{feedback.title}</h3>
              <p className="feedback-message">{feedback.message}</p>
            </div>
          </div>
          
          <div className="next-timer">
            <div className="timer-track">
              <div className="timer-fill"></div>
            </div>
            <div className="timer-label">Следующий вопрос через 2 сек...</div>
          </div>
        </div>
      )}

      {/* Time Warning */}
      {!showResult && timeLeft < 5 && (
        <div className="time-warning">
          <Icon name="alertTriangle" size={20} />
          <span>Время истекает! Выбирай быстрее!</span>
        </div>
      )}
    </div>
  );
}