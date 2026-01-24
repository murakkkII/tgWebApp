import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import DuelScreen from './components/DuelScreen'
import SettingsScreen from './components/SettingsScreen'
import HomeScreen from './components/HomeScreen'
import './index.css'

function App() {
  const [screen, setScreen] = useState('home') // 'home' | 'start' | 'duel' | 'settings'
  const [score, setScore] = useState(0)
  const [settings, setSettings] = useState({ difficulty: 'normal', sound: true })
  const [isTelegram, setIsTelegram] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if running in Telegram
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        setIsTelegram(true)
        console.log('Running in Telegram Web App')
        console.log('User:', window.Telegram.WebApp.initDataUnsafe?.user)
      } else {
        console.log('Not running in Telegram')
      }
    } catch (error) {
      console.error('Error checking Telegram:', error)
    }

    // Simulate loading time to ensure everything is ready
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#ffffff',
        color: '#2d3748',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        🎯 Loading DuelQuiz...
      </div>
    )
  }

  const goToStart = () => {
    setScreen('start')
  }

  const startDuel = () => {
    setScreen('duel')
  }

  const finishDuel = (finalScore) => {
    setScore(finalScore)
    setScreen('start')
  }

  const goToSettings = () => {
    setScreen('settings')
  }

  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    setScreen('home')
  }

  const goHome = () => {
    setScreen('home')
  }

  return (
    <div className="app">
      {screen === 'home' ? (
        <HomeScreen onStart={goToStart} onSettings={goToSettings} />
      ) : screen === 'start' ? (
        <StartScreen onStart={startDuel} onSettings={goToSettings} score={score} onHome={goHome} />
      ) : screen === 'duel' ? (
        <DuelScreen onFinish={finishDuel} settings={settings} onHome={goHome} />
      ) : (
        <SettingsScreen onSave={saveSettings} onBack={goHome} initialSettings={settings} onHome={goHome} />
      )}
    </div>
  )
}

export default App