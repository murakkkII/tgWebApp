import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  ArrowLeft,
  User,
  Gamepad,
  Palette,
  Bell,
  Zap,
  Settings as SettingsIcon,
  VolumeX,
  Volume1,
  Volume2 as Volume2Icon,
  CheckCircle,
  RefreshCw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import './SettingsScreen.css';

// Эластичный слайдер
const MAX_OVERFLOW = 50;

function ElasticSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  leftIcon = null,
  rightIcon = null,
  showValue = true,
  className = '',
  step = 1,
  color = '#3b82f6'
}) {
  const sliderRef = useRef(null);
  const [region, setRegion] = useState('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);
  const [internalValue, setInternalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDragging && sliderRef.current) {
        const { left, width } = sliderRef.current.getBoundingClientRect();
        let newValue = min + ((e.clientX - left) / width) * (max - min);
        
        newValue = Math.round(newValue / step) * step;
        newValue = Math.min(Math.max(newValue, min), max);
        
        setInternalValue(newValue);
        onChange(newValue);
        clientX.set(e.clientX);

        // Эластичный эффект
        const { left: trackLeft, right: trackRight } = sliderRef.current.getBoundingClientRect();
        let newOverflow = 0;

        if (e.clientX < trackLeft) {
          setRegion('left');
          newOverflow = trackLeft - e.clientX;
        } else if (e.clientX > trackRight) {
          setRegion('right');
          newOverflow = e.clientX - trackRight;
        } else {
          setRegion('middle');
          newOverflow = 0;
        }

        overflow.set(decay(newOverflow, MAX_OVERFLOW));
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      animate(overflow, 0, { type: 'spring', bounce: 0.5 });
    };

    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging, min, max, step, onChange, clientX, overflow]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const rect = sliderRef.current.getBoundingClientRect();
    let newValue = min + ((e.clientX - rect.left) / rect.width) * (max - min);
    newValue = Math.round(newValue / step) * step;
    setInternalValue(newValue);
    onChange(newValue);
    clientX.set(e.clientX);
  };

  const getRangePercentage = () => {
    const totalRange = max - min;
    if (totalRange === 0) return 0;
    return ((internalValue - min) / totalRange) * 100;
  };

  const decay = (value, max) => {
    if (max === 0) return 0;
    const entry = value / max;
    const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
    return sigmoid * max;
  };

  const scaleX = useTransform(() => {
    if (sliderRef.current && overflow.get() !== 0) {
      const { width } = sliderRef.current.getBoundingClientRect();
      return 1 + overflow.get() / width;
    }
    return 1;
  });

  const scaleY = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.85]);

  const transformOrigin = useTransform(() => {
    if (sliderRef.current && clientX.get() !== 0) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      return clientX.get() < left + width / 2 ? 'right' : 'left';
    }
    return 'center';
  });

  const sliderHeight = useTransform(scale, [1, 1.1], [6, 10]);
  const sliderMarginTop = useTransform(scale, [1, 1.1], [0, -2]);
  const sliderMarginBottom = useTransform(scale, [1, 1.1], [0, -2]);

  const leftIconX = useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0));
  const rightIconX = useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0));

  return (
    <div className={`elastic-slider-container ${className}`}>
      <motion.div
        onHoverStart={() => animate(scale, 1.1)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.1)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.1], [0.9, 1])
        }}
        className="elastic-slider-wrapper"
      >
        {leftIcon && (
          <motion.div
            animate={{
              scale: region === 'left' ? [1, 1.3, 1] : 1,
            }}
            style={{
              x: leftIconX
            }}
            className="elastic-slider-icon"
          >
            {leftIcon}
          </motion.div>
        )}

        <div
          ref={sliderRef}
          className="elastic-slider-root"
          onPointerDown={handlePointerDown}
        >
          <motion.div
            style={{
              scaleX,
              scaleY,
              transformOrigin,
              height: sliderHeight,
              marginTop: sliderMarginTop,
              marginBottom: sliderMarginBottom
            }}
            className="elastic-slider-track-wrapper"
          >
            <div className="elastic-slider-track">
              <div 
                className="elastic-slider-range" 
                style={{ 
                  width: `${getRangePercentage()}%`,
                  backgroundColor: color
                }} 
              />
            </div>
          </motion.div>
        </div>

        {rightIcon && (
          <motion.div
            animate={{
              scale: region === 'right' ? [1, 1.3, 1] : 1,
            }}
            style={{
              x: rightIconX
            }}
            className="elastic-slider-icon"
          >
            {rightIcon}
          </motion.div>
        )}
      </motion.div>
      
      {showValue && (
        <motion.div 
          className="elastic-slider-value"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
          key={internalValue}
        >
          {Math.round(internalValue)}
        </motion.div>
      )}
    </div>
  );
}

function SettingsScreen({ initialSettings }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(initialSettings || {
    username: 'Игрок',
    difficulty: 'normal',
    questionCount: 10,
    sound: true,
    volume: 80,
    animations: true,
    notifications: true,
  });

  const [collapsedSections, setCollapsedSections] = useState({});
  const [saveStatus, setSaveStatus] = useState(null);
  const saveTimeoutRef = useRef(null);
  const lastSavedRef = useRef(null);

  // Автосохранение
  const autoSave = useCallback((newSettings) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      
      try {
        // Здесь будет вызов API для сохранения
        await new Promise(resolve => setTimeout(resolve, 300));
        
        lastSavedRef.current = Date.now();
        setSaveStatus('saved');
        
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (error) {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(null), 2000);
      }
    }, 500);
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      autoSave(newSettings);
      return newSettings;
    });
  }, [autoSave]);

  const toggleSection = useCallback((section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const getVolumeIcon = (volume) => {
    if (volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2Icon;
  };

  const VolumeIcon = getVolumeIcon(settings.volume);

  const settingsSections = [
    {
      id: 'username',
      icon: User,
      label: 'Имя игрока',
      isCollapsed: collapsedSections.username,
      content: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="setting-content"
        >
          <input
            type="text"
            className="setting-input"
            value={settings.username}
            onChange={(e) => updateSetting('username', e.target.value)}
            placeholder="Ваше имя"
            maxLength="20"
          />
          <div className="input-counter">{settings.username.length}/20</div>
        </motion.div>
      )
    },
    {
      id: 'difficulty',
      icon: Gamepad,
      label: 'Сложность',
      isCollapsed: collapsedSections.difficulty,
      content: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="setting-content"
        >
          <div className="difficulty-grid">
            {[
              { value: 'easy', label: 'Легко', color: '#10b981' },
              { value: 'normal', label: 'Нормально', color: '#3b82f6' },
              { value: 'hard', label: 'Сложно', color: '#ef4444' }
            ].map((option) => (
              <motion.button
                key={option.value}
                className={`difficulty-option ${settings.difficulty === option.value ? 'active' : ''}`}
                onClick={() => updateSetting('difficulty', option.value)}
                style={{ '--option-color': option.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )
    },
    {
      id: 'questions',
      icon: Zap,
      label: 'Количество вопросов',
      isCollapsed: collapsedSections.questions,
      content: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="setting-content"
        >
          <ElasticSlider
            value={settings.questionCount}
            onChange={(val) => updateSetting('questionCount', val)}
            min={5}
            max={20}
            step={1}
            leftIcon={<Zap size={18} />}
            color="#3b82f6"
            showValue={true}
          />
        </motion.div>
      )
    },
    {
      id: 'sound',
      icon: Volume2Icon,
      label: 'Звук',
      isCollapsed: collapsedSections.sound,
      content: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="setting-content"
        >
          <div className="sound-toggle">
            <span>Звуковые эффекты</span>
            <motion.label 
              className="toggle-switch"
              whileTap={{ scale: 0.9 }}
            >
              <input
                type="checkbox"
                checked={settings.sound}
                onChange={(e) => updateSetting('sound', e.target.checked)}
              />
              <span className="toggle-slider" />
            </motion.label>
          </div>
          
          {settings.sound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="volume-control"
            >
              <ElasticSlider
                value={settings.volume}
                onChange={(val) => updateSetting('volume', val)}
                min={0}
                max={100}
                step={5}
                leftIcon={<Volume1 size={18} />}
                rightIcon={<Volume2Icon size={18} />}
                color="#10b981"
                showValue={true}
              />
            </motion.div>
          )}
        </motion.div>
      )
    },
    {
      id: 'animations',
      icon: Palette,
      label: 'Анимации',
      isCollapsed: collapsedSections.animations,
      content: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="setting-content"
        >
          <div className="toggle-item">
            <span>Анимации интерфейса</span>
            <motion.label 
              className="toggle-switch"
              whileTap={{ scale: 0.9 }}
            >
              <input
                type="checkbox"
                checked={settings.animations}
                onChange={(e) => updateSetting('animations', e.target.checked)}
              />
              <span className="toggle-slider" />
            </motion.label>
          </div>
        </motion.div>
      )
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Уведомления',
      isCollapsed: collapsedSections.notifications,
      content: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="setting-content"
        >
          <div className="toggle-item">
            <span>Получать уведомления</span>
            <motion.label 
              className="toggle-switch"
              whileTap={{ scale: 0.9 }}
            >
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSetting('notifications', e.target.checked)}
              />
              <span className="toggle-slider" />
            </motion.label>
          </div>
        </motion.div>
      )
    }
  ];

  const handleReset = useCallback(() => {
    const defaultSettings = {
      username: 'Игрок',
      difficulty: 'normal',
      questionCount: 10,
      sound: true,
      volume: 80,
      animations: true,
      notifications: true,
    };
    setSettings(defaultSettings);
    autoSave(defaultSettings);
  }, [autoSave]);

  return (
    <motion.div 
      className="settings-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="settings-container">
        <div className="settings-header">
          <motion.button 
            className="back-button"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={22} />
          </motion.button>
          
          <div className="header-content">
            <SettingsIcon size={26} className="header-icon" />
            <h1>Настройки</h1>
            
            {saveStatus && (
              <motion.div 
                className={`save-status ${saveStatus}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {saveStatus === 'saving' && (
                  <>
                    <div className="saving-spinner" />
                    <span>Сохранение...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <CheckCircle size={16} />
                    <span>Сохранено</span>
                  </>
                )}
                {saveStatus === 'error' && (
                  <>
                    <span style={{ color: '#ef4444' }}>Ошибка</span>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="settings-content">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            
            return (
              <motion.div 
                key={section.id}
                className="setting-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.005 }}
              >
                <motion.div 
                  className="section-header"
                  onClick={() => toggleSection(section.id)}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="section-icon">
                    <Icon size={20} />
                  </div>
                  
                  <span className="section-label">{section.label}</span>
                  
                  <motion.div 
                    className="collapse-icon"
                    animate={{ rotate: section.isCollapsed ? -90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </motion.div>
                
                {!section.isCollapsed && section.content}
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="action-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <motion.button
            className="reset-button"
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} />
            Сбросить настройки
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SettingsScreen;