import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExploreModel from './pages/ExploreModel';
import Results from './pages/Results';
import LiveDemo from './pages/LiveDemo';
import Team from './pages/Team';
import './App.css';

function App() {
  const [darkMode] = useState(true);
  
  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreModel />} />
            <Route path="/results" element={<Results />} />
            <Route path="/demo" element={<LiveDemo />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;