import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, PieChart, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Create, Share, and <span className="text-amber-400">Test</span> Knowledge
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
              TestHive provides a powerful platform for creating engaging quizzes, testing knowledge, and tracking progress with detailed analytics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={currentUser ? "/create-quiz" : "/login"}
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-3 px-8 rounded-full transition-colors shadow-lg"
              >
                {currentUser ? "Create a Quiz" : "Get Started"}
              </Link>
              <Link
                to="/quizzes"
                className="bg-transparent border-2 border-purple-400 text-white hover:bg-purple-800 hover:border-purple-300 font-medium py-3 px-8 rounded-full transition-colors"
              >
                Browse Quizzes
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Everything you need to create and manage interactive quizzes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Quiz Creation</h3>
              <p className="text-purple-200 text-center">
                Create beautiful quizzes with multiple-choice questions, images, and custom themes.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-indigo-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">User Authentication</h3>
              <p className="text-purple-200 text-center">
                Secure login system for quiz creators and participants with personalized dashboards.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-amber-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Leaderboard</h3>
              <p className="text-purple-200 text-center">
                Track high scores and compete with others on global and quiz-specific leaderboards.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-teal-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <PieChart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Analytics</h3>
              <p className="text-purple-200 text-center">
                Detailed insights into quiz performance, participant statistics, and improvement areas.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to create your first quiz?</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
            Join thousands of educators, trainers, and knowledge enthusiasts who use TestHive to create engaging quizzes.
          </p>
          <Link
            to={currentUser ? "/create-quiz" : "/signup"}
            className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-3 px-8 rounded-full transition-colors shadow-lg"
          >
            {currentUser ? "Create Quiz Now" : "Sign Up Free"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;