import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, BookOpen, BarChart3 } from 'lucide-react';
import { Quiz } from '../context/QuizContext';

interface QuizCardProps {
  quiz: Quiz;
  showActions?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, showActions = true }) => {
  const navigate = useNavigate();
  
  const estimatedTime = Math.ceil(quiz.questions.length * 0.5); // 30 seconds per question
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
      <div className="h-3 bg-gradient-to-r from-purple-600 to-indigo-700"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{quiz.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            <span>{quiz.questions.length} questions</span>
          </div>
          <div className="flex items-center">
            <Timer size={16} className="mr-1" />
            <span>~{estimatedTime} min</span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex space-x-2 mt-4">
            <button 
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <BookOpen size={16} className="mr-2" />
              Take Quiz
            </button>
            <button 
              onClick={() => navigate(`/quiz/stats/${quiz.id}`)}
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
            >
              <BarChart3 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;