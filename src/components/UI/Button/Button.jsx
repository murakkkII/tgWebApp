import React from 'react';
import Icon from '../Icon/Icon';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={size === 'large' ? 20 : size === 'small' ? 14 : 16} />
      )}
      
      <span className="btn-content">
        {children}
      </span>
      
      {loading && (
        <div className="btn-spinner">
          <Icon name="refreshCw" size={size === 'large' ? 20 : size === 'small' ? 14 : 16} />
        </div>
      )}
      
      {icon && iconPosition === 'right' && !loading && (
        <Icon name={icon} size={size === 'large' ? 20 : size === 'small' ? 14 : 16} />
      )}
    </button>
  );
};

export default Button;