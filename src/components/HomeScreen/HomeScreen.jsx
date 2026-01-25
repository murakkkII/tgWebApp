import React from 'react';
import { Home, Settings, Play, Trophy, Users, Globe, Zap, Timer, Target, Brain, Award, Medal, Star, Flame, ChevronRight, Check, X, Clock, BarChart, User, Sun, Moon, Volume2, VolumeX, RefreshCw, ArrowLeft, HelpCircle, Crown, Shield, Sword, Puzzle, Lightbulb, Gamepad, Palette, Bell, Menu, History, BookOpen, FlaskConical, Dumbbell, Film } from 'lucide-react';
import './HomeScreen.css';

function HomeScreen({ onStart, onSettings }) {
  return (
    <div className="screen home-screen">
      <div className="home-content">
        <div className="home-hero">
          <div className="home-logo">
            <Target size={64} className="logo-icon" />
          </div>
          <h1 className="home-title">DuelQuiz</h1>
          <p className="home-subtitle">Дружеские дуэли знаний на скорость</p>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <Zap size={40} className="feature-icon" />
            <h3>Быстрые раунды</h3>
            <p>Отвечайте на вопросы за ограниченное время</p>
          </div>
          
          <div className="feature-card">
            <Brain size={40} className="feature-icon" />
            <h3>5+ тематик</h3>
            <p>География, история, наука и многое другое</p>
          </div>
          
          <div className="feature-card">
            <Trophy size={40} className="feature-icon" />
            <h3>Соревнуйся</h3>
            <p>Поднимайся в таблице лидеров</p>
          </div>
        </div>

        <div className="home-actions">
          <button className="btn btn-primary btn-large" onClick={onStart}>
            <Play size={20} />
            Начать игру
          </button>
          
          <button className="btn btn-secondary" onClick={onSettings}>
            <Settings size={18} />
            Настройки
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;