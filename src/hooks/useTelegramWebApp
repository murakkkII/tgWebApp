import { useEffect, useCallback } from 'react';

// Хук для работы с Telegram WebApp
export const useTelegramWebApp = () => {
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      // Раскрываем приложение на весь экран
      tg.expand();
      
      // Сообщаем, что приложение готово
      tg.ready();
      
      // Включаем подтверждение при закрытии (опционально)
      tg.enableClosingConfirmation();
      
      // Настраиваем цвета темы
      tg.setHeaderColor('#1a1a2e');
      tg.setBackgroundColor('#16213e');
    }
  }, [tg]);

  // Легкая вибрация для нажатия на кнопки
  const buttonTap = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light');
    }
  }, [tg]);

  // Средняя вибрация для важных действий
  const mediumImpact = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('medium');
    }
  }, [tg]);

  // Сильная вибрация для критических действий
  const heavyImpact = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('heavy');
    }
  }, [tg]);

  // Вибрация для успешного ответа
  const successFeedback = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred('success');
    }
  }, [tg]);

  // Вибрация для неправильного ответа
  const errorFeedback = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred('error');
    }
  }, [tg]);

  // Вибрация для предупреждения
  const warningFeedback = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred('warning');
    }
  }, [tg]);

  // Вибрация при выборе элемента
  const selectionChanged = useCallback(() => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
  }, [tg]);

  return {
    tg,
    haptic: {
      buttonTap,
      mediumImpact,
      heavyImpact,
      success: successFeedback,
      error: errorFeedback,
      warning: warningFeedback,
      selection: selectionChanged,
    },
  };
};

// Компонент-обёртка для автоматической вибрации при клике
export const HapticButton = ({ 
  children, 
  onClick, 
  hapticType = 'light',
  className = '',
  disabled = false,
  ...props 
}) => {
  const { haptic } = useTelegramWebApp();

  const handleClick = (e) => {
    if (!disabled) {
      // Выбираем тип вибрации
      switch (hapticType) {
        case 'light':
          haptic.buttonTap();
          break;
        case 'medium':
          haptic.mediumImpact();
          break;
        case 'heavy':
          haptic.heavyImpact();
          break;
        case 'selection':
          haptic.selection();
          break;
        default:
          haptic.buttonTap();
      }
      
      // Вызываем оригинальный обработчик
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <button 
      className={className}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};