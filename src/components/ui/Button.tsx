import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button', // Default type to 'button'
  ...props
}) => {
  const baseStyle = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150';
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyle = 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'outline':
      variantStyle = 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500';
      break;
    default:
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
