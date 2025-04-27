import { ArrowUp, Github, Globe } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-center md:text-left">
          {/* Left section */}
          <div className="order-2 md:order-1">
            <h3 className="text-xl font-bold mb-4 text-gradient">DefectronQ</h3>
            <p className="text-gray-400 mb-4">
              Detecting defects in manufacturing by learning what 'normal' looks like — powered by hybrid quantum-classical AI.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/24zuli/DefectronQ.git"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://mvtec.com/company/research/datasets"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Center Navigation section
          <div className="order-1 md:order-2">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Explore Model
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Right section */}
          <div className="order-2 md:order-2">
            <h3 className="text-lg font-semibold mb-4">Acknowledgments</h3>
            <ul className="space-y-2 text-gray-400">
              <li>MVTec AD Dataset</li>
              <li>PennyLane Quantum Framework</li>
              <li>PyTorch</li>
              <li>React & Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} DefectronQ. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <button
              onClick={scrollToTop}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-transform hover:translate-y-[-5px] duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <ArrowUp className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
