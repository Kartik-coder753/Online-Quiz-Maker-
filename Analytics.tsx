import React, { useEffect, useState } from 'react';
import { BarChart3, PieChart, Users, BookOpen, Award, ArrowUpRight } from 'lucide-react';
import { useQuiz, Quiz, QuizAttempt } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Analytics: React.FC = () => {
  const { currentUser } = useAuth();
  const { quizzes, userAttempts } = useQuiz();
  const navigate = useNavigate();
  
  const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    totalQuizzes: 0,
    averageScore: 0,
    mostPopularQuiz: '',
    hardestQuestion: '',
  });
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Get quizzes created by current user
    const userOwnedQuizzes = quizzes.filter(quiz => quiz.creatorId === currentUser.id);
    setUserQuizzes(userOwnedQuizzes);
    
    if (userOwnedQuizzes.length > 0 && !selectedQuiz) {
      setSelectedQuiz(userOwnedQuizzes[0]);
    }
  }, [currentUser, quizzes, navigate]);
  
  useEffect(() => {
    if (selectedQuiz) {
      // Get all attempts for the selected quiz
      const attempts = userAttempts.filter(attempt => attempt.quizId === selectedQuiz.id);
      setQuizAttempts(attempts);
      
      // Calculate stats
      const totalAttempts = attempts.length;
      const totalQuizzes = userQuizzes.length;
      
      // Calculate average score
      const averageScore = totalAttempts > 0
        ? attempts.reduce((sum, attempt) => sum + (attempt.score / attempt.maxScore), 0) / totalAttempts
        : 0;
      
      // Find most popular quiz
      const quizAttemptCounts = new Map<string, number>();
      userQuizzes.forEach(quiz => {
        const count = userAttempts.filter(attempt => attempt.quizId === quiz.id).length;
        quizAttemptCounts.set(quiz.id, count);
      });
      
      let mostPopularQuizId = '';
      let maxAttempts = 0;
      quizAttemptCounts.forEach((count, quizId) => {
        if (count > maxAttempts) {
          maxAttempts = count;
          mostPopularQuizId = quizId;
        }
      });
      
      const mostPopularQuiz = userQuizzes.find(quiz => quiz.id === mostPopularQuizId)?.title || '';
      
      // Find hardest question
      const questionStats = new Map<string, { correct: number, total: number }>();
      
      attempts.forEach(attempt => {
        attempt.answers.forEach(answer => {
          if (!questionStats.has(answer.questionId)) {
            questionStats.set(answer.questionId, { correct: 0, total: 0 });
          }
          
          const stat = questionStats.get(answer.questionId)!;
          stat.total += 1;
          if (answer.isCorrect) {
            stat.correct += 1;
          }
        });
      });
      
      let hardestQuestionId = '';
      let lowestCorrectRate = 1; // 100%
      
      questionStats.forEach((stat, questionId) => {
        const correctRate = stat.total > 0 ? stat.correct / stat.total : 1;
        if (correctRate < lowestCorrectRate) {
          lowestCorrectRate = correctRate;
          hardestQuestionId = questionId;
        }
      });
      
      const hardestQuestion = selectedQuiz.questions.find(q => q.id === hardestQuestionId)?.question || '';
      
      setStats({
        totalAttempts,
        totalQuizzes,
        averageScore,
        mostPopularQuiz,
        hardestQuestion: hardestQuestion.length > 50 ? hardestQuestion.substring(0, 50) + '...' : hardestQuestion,
      });
    }
  }, [selectedQuiz, userAttempts, userQuizzes]);
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Analytics</h1>
        <p className="text-purple-200 mb-8">
          Gain insights into your quiz performance and user engagement
        </p>
        
        {userQuizzes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-purple-200 mb-4">
              You haven't created any quizzes yet.
            </p>
            <button
              onClick={() => navigate('/create-quiz')}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg inline-flex items-center"
            >
              Create Your First Quiz
              <ArrowUpRight size={18} className="ml-2" />
            </button>
          </div>
        ) : (
          <>
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Total Quizzes</p>
                    <h3 className="text-3xl font-bold text-white">{stats.totalQuizzes}</h3>
                  </div>
                  <div className="bg-purple-600/50 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-purple-200" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Total Attempts</p>
                    <h3 className="text-3xl font-bold text-white">{stats.totalAttempts}</h3>
                  </div>
                  <div className="bg-purple-600/50 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-purple-200" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Average Score</p>
                    <h3 className="text-3xl font-bold text-white">
                      {Math.round(stats.averageScore * 100)}%
                    </h3>
                  </div>
                  <div className="bg-purple-600/50 p-3 rounded-lg">
                    <PieChart className="h-6 w-6 text-purple-200" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Most Popular</p>
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                      {stats.mostPopularQuiz || 'N/A'}
                    </h3>
                  </div>
                  <div className="bg-purple-600/50 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-purple-200" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quiz Selector and Detailed Stats */}
            <div className="mb-8">
              <label htmlFor="quizSelect" className="block text-sm font-medium text-purple-200 mb-2">
                Select Quiz for Detailed Analysis
              </label>
              <select
                id="quizSelect"
                value={selectedQuiz?.id || ''}
                onChange={(e) => {
                  const selected = userQuizzes.find(quiz => quiz.id === e.target.value);
                  setSelectedQuiz(selected || null);
                }}
                className="w-full md:w-1/2 p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent mb-6"
              >
                {userQuizzes.map(quiz => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </select>
              
              {selectedQuiz && (
                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {selectedQuiz.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-purple-200 mb-3 flex items-center">
                        <BarChart3 className="mr-2" size={18} />
                        Performance Overview
                      </h4>
                      
                      {quizAttempts.length === 0 ? (
                        <p className="text-purple-300">No attempts for this quiz yet.</p>
                      ) : (
                        <div>
                          <div className="mb-4">
                            <p className="text-sm text-purple-300 mb-1">Total Attempts</p>
                            <p className="text-2xl font-semibold text-white">{quizAttempts.length}</p>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-purple-300 mb-1">Average Score</p>
                            <p className="text-2xl font-semibold text-white">
                              {Math.round(
                                (quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / 
                                quizAttempts.reduce((sum, attempt) => sum + attempt.maxScore, 0)) * 100
                              )}%
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-purple-300 mb-1">Hardest Question</p>
                            <p className="text-white">
                              {stats.hardestQuestion || 'Not enough data'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-purple-200 mb-3 flex items-center">
                        <Users className="mr-2" size={18} />
                        Recent Attempts
                      </h4>
                      
                      {quizAttempts.length === 0 ? (
                        <p className="text-purple-300">No attempts for this quiz yet.</p>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {quizAttempts
                            .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                            .slice(0, 5)
                            .map((attempt, index) => (
                              <div 
                                key={index} 
                                className="bg-white/10 p-3 rounded-lg flex justify-between items-center"
                              >
                                <div>
                                  <p className="text-white font-medium">
                                    User-{attempt.userId.substring(0, 5)}
                                  </p>
                                  <p className="text-purple-300 text-sm">
                                    {new Date(attempt.completedAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className={`text-xl font-semibold ${
                                    attempt.score / attempt.maxScore >= 0.7
                                      ? 'text-green-400'
                                      : attempt.score / attempt.maxScore >= 0.4
                                        ? 'text-amber-400'
                                        : 'text-red-400'
                                  }`}>
                                    {attempt.score}/{attempt.maxScore}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;