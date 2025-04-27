import { ReactNode, useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({ 
  children, 
  speed = 0.5,
  className = '' 
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top } = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when the section is in view
      if (top < windowHeight && top > -sectionRef.current.offsetHeight) {
        // Calculate how far the section is from the center of the viewport
        const centerOffset = top - windowHeight / 2 + sectionRef.current.offsetHeight / 2;
        setOffset(centerOffset * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`parallax-container overflow-hidden ${className}`}
    >
      <div 
        className="parallax-element"
        style={{
          transform: `translateY(${offset}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;