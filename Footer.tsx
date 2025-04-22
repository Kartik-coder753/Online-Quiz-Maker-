import React from 'react';
import { HexagonIcon, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <HexagonIcon className="w-8 h-8 text-amber-400" />
              <span className="text-xl font-bold text-white">TEST<span className="text-amber-400">HIVE</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              The ultimate platform for creating and taking interactive quizzes. Test knowledge, challenge friends, and track your progress.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Created by Kartik Kumar Singh</p>
              <div className="flex space-x-4 mt-2">
                <a 
                  href="https://github.com/Kartik-coder753" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="mailto:kartikks1205@gmail.com"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Home</a></li>
              <li><a href="/quizzes" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Browse Quizzes</a></li>
              <li><a href="/leaderboard" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Leaderboard</a></li>
              <li><a href="/create-quiz" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Create Quiz</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-white text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none text-sm w-full"
                />
                <button className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r-md transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} TestHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;