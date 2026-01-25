import React from 'react';
import './Card.css';

const Card = ({ children, variant = 'default', hoverable = false, className = '', ...props }) => {
  const cardClasses = [
    'card',
    `card-${variant}`,
    hoverable && 'card-hoverable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;