import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  HexagonIcon, 
  Menu, 
  X, 
  LogOut, 
  User, 
  PieChart, 
  Home, 
  Award, 
  BookOpen,
  Github,
  Mail,
  Info
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFounderInfo, setShowFounderInfo] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-amber-400' : 'text-white hover:text-amber-300';
  };
  
  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-800 shadow-md py-4 px-4 md:px-8 transition-all duration-300 ease-in-out relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <HexagonIcon className="w-8 h-8 text-amber-400" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight">TEST<span className="text-amber-400">HIVE</span></span>
            <span className="text-xs text-purple-200 -mt-1">Interactive Quiz Platform</span>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Open menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${isActive('/')} font-medium transition-colors`}>
            Home
          </Link>
          <Link to="/quizzes" className={`${isActive('/quizzes')} font-medium transition-colors`}>
            Quizzes
          </Link>
          <Link to="/leaderboard" className={`${isActive('/leaderboard')} font-medium transition-colors`}>
            Leaderboard
          </Link>
          {currentUser && (
            <Link to="/analytics" className={`${isActive('/analytics')} font-medium transition-colors`}>
              Analytics
            </Link>
          )}
          
          {/* Founder Info Button */}
          <button
            onClick={() => setShowFounderInfo(!showFounderInfo)}
            className="text-white hover:text-amber-300 transition-colors flex items-center"
          >
            <Info size={18} className="mr-1" />
            <span>About</span>
          </button>
          
          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors">
                <User size={18} />
                <span>{currentUser.username}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>Profile</span>
                  </div>
                </Link>
                <div 
                  onClick={logout}
                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors duration-200">
              Login
            </Link>
          )}
        </nav>
      </div>
      
      {/* Founder Info Modal */}
      {showFounderInfo && (
        <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-lg shadow-xl p-6 z-50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">About TestHive</h3>
            <button
              onClick={() => setShowFounderInfo(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-700">
              <User size={16} />
              <span>Kartik Kumar Singh</span>
            </div>
            <a
              href="mailto:kartikks1205@gmail.com"
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
            >
              <Mail size={16} />
              <span>kartikks1205@gmail.com</span>
            </a>
            <a
              href="https://github.com/Kartik-coder753"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <Github size={16} />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      )}
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-indigo-900 shadow-xl z-50 transition-all duration-300 ease-in-out">
          <div className="flex flex-col p-4 space-y-3">
            <Link to="/" className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800" onClick={toggleMenu}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/quizzes" className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800" onClick={toggleMenu}>
              <BookOpen size={18} />
              <span>Quizzes</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800" onClick={toggleMenu}>
              <Award size={18} />
              <span>Leaderboard</span>
            </Link>
            {currentUser && (
              <Link to="/analytics" className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800" onClick={toggleMenu}>
                <PieChart size={18} />
                <span>Analytics</span>
              </Link>
            )}
            
            <button
              onClick={() => setShowFounderInfo(!showFounderInfo)}
              className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 w-full text-left"
            >
              <Info size={18} />
              <span>About</span>
            </button>
            
            {currentUser ? (
              <>
                <Link to="/profile" className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800" onClick={toggleMenu}>
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={() => { logout(); toggleMenu(); }}
                  className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 w-full text-left"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-3 text-white py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600" onClick={toggleMenu}>
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;