import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 transition-shadow duration-300 hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;
