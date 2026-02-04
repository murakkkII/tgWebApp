import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, LogIn, CheckCircle } from 'lucide-react';
import './UserAuthPage.css';

function UserAuthPage() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /* ===== validation ===== */
  const validateNickname = (name) => {
    const trimmed = name.trim();

    if (trimmed.length < 3) {
      return 'Никнейм должен быть не короче 3 символов';
    }

    if (!/^[a-zA-Z0-9_а-яА-Я]+$/.test(trimmed)) {
      return 'Разрешены только буквы, цифры и _';
    }

    return '';
  };

  /* ===== submit ===== */
  const handleSubmit = () => {
    const validationError = validateNickname(nickname);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSuccess(true);

    // сохраняем пользователя
    localStorage.setItem('nickname', nickname.trim());

    // небольшая задержка под анимацию успеха
    setTimeout(() => {
      navigate('/home');
    }, 900);
  };

  return (
    <div className="home-screen animate-fade-in">
      <div className="home-container">

        {/* Hero */}
        <div className="home-hero">
          <div className="hero-logo">
            <div className={`logo-circle ${success ? 'success' : ''}`}>
              {success ? <CheckCircle size={48} /> : <Brain size={48} />}
            </div>
          </div>

          <div className="hero-content">
            <h1>DuelQuiz</h1>
            <p className="hero-subtitle">
              {success
                ? 'Успешный вход!'
                : 'Введи никнейм, чтобы начать игру'}
            </p>
          </div>
        </div>

        {/* Auth */}
        <div className={`auth-card card ${success ? 'auth-success' : ''}`}>
          <div className="auth-inline">
            <input
              type="text"
              placeholder="Твой никнейм"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              maxLength={16}
              className={`auth-input ${error ? 'error' : ''}`}
              disabled={success}
            />

            <button
              className="btn btn-primary auth-btn"
              onClick={handleSubmit}
              disabled={!nickname.trim() || success}
            >
              {success ? 'Готово' : (
                <>
                  <LogIn size={18} />
                  Войти
                </>
              )}
            </button>
          </div>

          {/* error */}
          {error && <p className="auth-error">{error}</p>}

          {!error && !success && (
            <p className="auth-hint">
              Никнейм будет виден другим игрокам
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default UserAuthPage;