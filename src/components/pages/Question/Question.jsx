import React from 'react';

function Question({ question, options, selectedAnswer, correctAnswer, onSelect, disabled }) {
  return (
    <div className="question-card card">
      <h3 className="question-text">{question}</h3>
      
      <div className="options-grid">
        {options.map((option, index) => {
          let className = 'option-btn';
          
          if (selectedAnswer !== null) {
            if (index === correctAnswer) {
              className += ' correct';
            } else if (index === selectedAnswer && index !== correctAnswer) {
              className += ' wrong';
            } else {
              className += ' disabled';
            }
          } else if (selectedAnswer === index) {
            className += ' selected';
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => !disabled && onSelect(index)}
              disabled={disabled}
            >
              <div className="option-label">{String.fromCharCode(65 + index)}</div>
              <div className="option-text">{option}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;