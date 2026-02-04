import React from 'react';
import { Target, Zap, Brain, Trophy, Star, Sparkles } from 'lucide-react';
import './FloatingElements.css';

export function FloatingElements() {
  const elements = [
    { Icon: Target, color: '#6366f1', top: '10%', left: '5%', delay: 0 },
    { Icon: Zap, color: '#8b5cf6', top: '20%', right: '10%', delay: 0.5 },
    { Icon: Brain, color: '#ec4899', bottom: '30%', left: '15%', delay: 1 },
    { Icon: Trophy, color: '#f59e0b', top: '40%', right: '15%', delay: 1.5 },
    { Icon: Star, color: '#10b981', bottom: '20%', right: '5%', delay: 2 },
    { Icon: Sparkles, color: '#0ea5e9', top: '15%', left: '85%', delay: 2.5 },
  ];

  return (
    <div className="floating-elements">
      {elements.map((element, index) => (
        <div
          key={index}
          className="floating-element"
          style={{
            '--color': element.color,
            '--top': element.top,
            '--left': element.left,
            '--right': element.right,
            '--bottom': element.bottom,
            '--delay': `${element.delay}s`,
          }}
        >
          <element.Icon size={32} />
        </div>
      ))}
      
      {/* Анимированные геометрические фигуры */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>
    </div>
  );
}