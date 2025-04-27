import { useEffect, useRef } from 'react';

interface AnimatedTitleProps {
  text: string;
  subtitle?: string;
  className?: string;
}

const AnimatedTitle = ({ text, subtitle, className = '' }: AnimatedTitleProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('translate-y-10', 'opacity-0');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={titleRef} 
      className={`transition-all duration-1000 ease-out transform translate-y-10 opacity-0 ${className}`}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight glow-text">{text}</h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
};

export default AnimatedTitle;