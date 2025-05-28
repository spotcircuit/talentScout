import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g., 'text-blue-500'
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'text-blue-600',
  className = '',
}) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-6 w-6';
      break;
    case 'md':
      sizeClasses = 'h-8 w-8';
      break;
    case 'lg':
      sizeClasses = 'h-12 w-12';
      break;
    default:
      sizeClasses = 'h-8 w-8';
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses} border-t-2 border-b-2 ${color.replace('text-', 'border-')}`}
      ></div>
    </div>
  );
};

export default Spinner;
