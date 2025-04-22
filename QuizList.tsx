import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';

const QuizList: React.FC = () => {
  const { quizzes, loadQuizzes } = useQuiz();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  
  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredQuizzes(quizzes);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = quizzes.filter(
        quiz => 
          quiz.title.toLowerCase().includes(query) || 
          quiz.description.toLowerCase().includes(query)
      );
      setFilteredQuizzes(filtered);
    }
  }, [searchQuery, quizzes]);
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Explore Quizzes</h1>
        
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-purple-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quizzes..."
            className="w-full pl-10 p-3 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>
        
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-purple-200">
              {quizzes.length === 0
                ? "No quizzes available yet. Be the first to create one!"
                : "No quizzes match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;