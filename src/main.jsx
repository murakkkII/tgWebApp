import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize Telegram Web App
try {
  if (window.Telegram && window.Telegram.WebApp) {
    console.log('Telegram Web App detected')
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.setHeaderColor('#4299e1')
    window.Telegram.WebApp.setBackgroundColor('#ffffff')
    console.log('Telegram Web App initialized')
  } else {
    console.log('Not running in Telegram Web App')
  }
} catch (error) {
  console.error('Error initializing Telegram Web App:', error)
}

console.log('Starting React app...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)