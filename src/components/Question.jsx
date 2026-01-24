export default function Question({ question, options, correctIndex, onAnswer, selectedAnswer, showResult, setSelectedAnswer }) {
  const handleClick = (index) => {
    if (showResult) return // Don't allow clicks after answer is shown
    
    setSelectedAnswer(index)
    onAnswer(index === correctIndex)
  }

  const getButtonClass = (index) => {
    if (!showResult) {
      return selectedAnswer === index ? 'option-btn selected' : 'option-btn'
    }
    
    if (index === correctIndex) {
      return 'option-btn correct'
    }
    
    if (index === selectedAnswer && index !== correctIndex) {
      return 'option-btn wrong'
    }
    
    return 'option-btn'
  }

  return (
    <div className="question">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => handleClick(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="result-message">
          {selectedAnswer === correctIndex ? '✅ Правильно!' : `❌ Неправильно! Правильный ответ: ${options[correctIndex]}`}
        </div>
      )}
    </div>
  )
}