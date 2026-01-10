import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  fullWidth = false,
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const widthClass = fullWidth ? 'btn-block' : '';
  
  return (
    <button 
      type={type} 
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
