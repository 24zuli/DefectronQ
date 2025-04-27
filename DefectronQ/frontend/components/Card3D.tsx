import React from 'react';
import { ReactNode, useRef, useState } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
}

const Card3D = ({ 
  children, 
  className = '',
  depth = 10,
  glowColor = 'rgba(96, 165, 250, 0.4)'
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * depth;
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * depth;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden transition-all duration-300
        transform-gpu bg-gray-800 rounded-xl ${className}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        boxShadow: isHovered 
          ? `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px ${glowColor}`
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
    >
      <div className="relative z-10">
        {children}
      </div>
      {isHovered && (
        <div 
          className="absolute inset-0 z-0 opacity-70"
          style={{
            background: `radial-gradient(circle at ${(rotation.y / depth + 1) * 50}% ${(1 - rotation.x / depth) * 50}%, ${glowColor} 0%, transparent 50%)`
          }}
        ></div>
      )}
    </div>
  );
};

export default Card3D;