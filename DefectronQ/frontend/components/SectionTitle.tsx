import { useEffect, useRef } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = false, 
  className = '' 
}: SectionTitleProps) => {
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
      className={`
        transition-all duration-700 ease-out transform translate-y-10 opacity-0
        mb-12 ${centered ? 'text-center' : ''} ${className}
      `}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        {title}
        <span className="block w-20 h-1 bg-blue-500 mt-2 rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-300 max-w-3xl mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;