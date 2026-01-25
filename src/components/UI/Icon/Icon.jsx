import React from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, size = 24, color = 'currentColor', className = '', ...props }) => {
  const LucideIcon = Icons[name];
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <LucideIcon 
      size={size} 
      color={color} 
      className={className}
      {...props}
    />
  );
};

export default Icon;

// Экспорт всех иконок для удобства
export const icons = {
  home: 'Home',
  settings: 'Settings',
  trophy: 'Trophy',
  play: 'Play',
  users: 'Users',
  globe: 'Globe',
  zap: 'Zap',
  timer: 'Timer',
  target: 'Target',
  brain: 'Brain',
  award: 'Award',
  medal: 'Medal',
  star: 'Star',
  flame: 'Flame',
  chevronRight: 'ChevronRight',
  check: 'Check',
  x: 'X',
  clock: 'Clock',
  barChart: 'BarChart',
  user: 'User',
  sun: 'Sun',
  moon: 'Moon',
  volume2: 'Volume2',
  volumeX: 'VolumeX',
  refreshCw: 'RefreshCw',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  helpCircle: 'HelpCircle',
  crown: 'Crown',
  shield: 'Shield',
  sword: 'Sword',
  puzzle: 'Puzzle',
  lightbulb: 'Lightbulb',
  gamepad: 'Gamepad',
  pallette: 'Palette',
  bell: 'Bell',
  menu: 'Menu',
  grid: 'Grid',
  list: 'List',
  smartphone: 'Smartphone',
  monitor: 'Monitor',
  maximize2: 'Maximize2',
  minimize2: 'Minimize2'
};