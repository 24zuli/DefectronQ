import React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Button3DProps {
  to?: string;
  onClick?: () => void;
  external?: boolean;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button3D = ({
  to,
  onClick,
  external = false,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
}: Button3DProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-500/20';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-purple-500/20';
      case 'outline':
        return 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10';
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-500/20';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-4 py-1.5';
      case 'md':
        return 'text-base px-6 py-3';
      case 'lg':
        return 'text-lg px-8 py-4';
      default:
        return 'text-base px-6 py-3';
    }
  };

  const baseClasses = `
    inline-block font-semibold rounded-lg transform transition-all duration-300
    active:scale-95 shadow-lg hover:shadow-xl ${getSizeClasses()} ${getVariantClasses()}
  `;

  const combinedClasses = `${baseClasses} ${className}`;

  if (to) {
    if (external) {
      return (
        <a href={to} className={combinedClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button3D;