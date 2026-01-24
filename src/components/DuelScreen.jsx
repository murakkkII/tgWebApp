import { useState, useEffect } from 'react'
import Question from './Question'
import questionsData from '../data/questions'

export default function DuelScreen({ onFinish, settings, onHome }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(settings.difficulty === 'easy' ? 20 : settings.difficulty === 'hard' ? 10 : 15)
  const [gameOver, setGameOver] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // Randomly select a topic on component mount
  useEffect(() => {
    const topics = Object.keys(questionsData)
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    setSelectedTopic(randomTopic)
  }, [])

  const questions = selectedTopic ? questionsData[selectedTopic] : []

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      nextQuestion(false)
    }
  }, [timeLeft, gameOver, showResult])

  const handleAnswer = (isCorrect) => {
    if (showResult) return // Prevent multiple clicks
    
    setShowResult(true)
    
    if (isCorrect) {
      setScore(prev => prev + 10 + timeLeft) // + бонус за скорость
    }
    
    // Wait 2 seconds to show the result, then go to next question
    setTimeout(() => {
      nextQuestion(isCorrect)
    }, 2000)
  }

  const nextQuestion = (answered = true) => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setGameOver(true)
      onFinish(score)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setTimeLeft(settings.difficulty === 'easy' ? 20 : settings.difficulty === 'hard' ? 10 : 15)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  if (gameOver) {
    return (
      <div className="duel-screen">
        <h2>🎉 Дуэль завершена!</h2>
        <p>Твой результат: <strong>{score} очков</strong> 🏅</p>
        <button className="btn primary" onClick={() => onFinish(score)}>
          🔄 Вернуться в меню
        </button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="duel-screen">
      <button className="home-btn" onClick={onHome}>
        🏠
      </button>
      <div className="header">
        <div>❓ Вопрос {currentQuestionIndex + 1} / {questions.length}</div>
        <div className="timer">⏰ {timeLeft} сек</div>
      </div>
      <div className="topic-display">
        🎯 Тема: {selectedTopic === 'geography' ? 'География' : 
                 selectedTopic === 'history' ? 'История' : 
                 selectedTopic === 'science' ? 'Наука' : 
                 selectedTopic === 'sports' ? 'Спорт' : 
                 selectedTopic === 'entertainment' ? 'Развлечения' : 'Загрузка...'}
      </div>
      <div className="timer-bar">
        <div 
          className="timer-progress" 
          style={{ width: `${(timeLeft / (settings.difficulty === 'easy' ? 20 : settings.difficulty === 'hard' ? 10 : 15)) * 100}%` }}
        ></div>
      </div>

      {questions.length > 0 ? (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          correctIndex={questions[currentQuestionIndex].correctIndex}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          setSelectedAnswer={setSelectedAnswer}
        />
      ) : (
        <div className="loading">Загрузка вопросов...</div>
      )}

      <div className="score">🏆 Очки: {score}</div>
    </div>
  )
}