import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Laptop, Cpu } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Cpu className="w-8 h-8 text-blue-500" />
              <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full -z-10"></div>
            </div>
            <span className="text-xl font-bold text-gradient">DefectronQ</span>
          </NavLink>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/explore" className="nav-link">
              Explore Model
            </NavLink>
            <NavLink to="/results" className="nav-link">
              Results
            </NavLink>
            <NavLink to="/demo" className="nav-link">
              Live Demo
            </NavLink>
            <NavLink to="/team" className="nav-link">
              Team
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`
            md:hidden bg-gray-800 absolute left-0 right-0 p-4 shadow-lg
            transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
          `}
        >
          <div className="flex flex-col space-y-4">
            <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/explore" className="nav-link" onClick={() => setIsOpen(false)}>
              Explore Model
            </NavLink>
            <NavLink to="/results" className="nav-link" onClick={() => setIsOpen(false)}>
              Results
            </NavLink>
            <NavLink to="/demo" className="nav-link" onClick={() => setIsOpen(false)}>
              Live Demo
            </NavLink>
            <NavLink to="/team" className="nav-link" onClick={() => setIsOpen(false)}>
              Team
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;