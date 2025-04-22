import React, { useState, useEffect } from 'react';
import { useQuiz, Quiz } from '../context/QuizContext';
import { Trophy, Search, Medal } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { quizzes, getLeaderboard } = useQuiz();
  const [selectedQuizId, setSelectedQuizId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  
  // Get all available quizzes
  const availableQuizzes = quizzes.filter(quiz => quiz.isPublished);
  
  // Update leaderboard when selected quiz changes
  useEffect(() => {
    if (selectedQuizId === 'all') {
      // Aggregate leaderboard from all quizzes
      const allLeaderboards = availableQuizzes.flatMap(quiz => {
        const quizLeaderboard = getLeaderboard(quiz.id);
        return quizLeaderboard.map(entry => ({
          ...entry,
          quizTitle: quiz.title
        }));
      });
      
      // Group by username and sum scores
      const userScores = new Map();
      allLeaderboards.forEach(entry => {
        const key = entry.username;
        if (!userScores.has(key)) {
          userScores.set(key, {
            username: entry.username,
            totalScore: 0,
            totalMaxScore: 0,
            quizCount: 0
          });
        }
        
        const userData = userScores.get(key);
        userData.totalScore += entry.score;
        userData.totalMaxScore += entry.maxScore;
        userData.quizCount += 1;
      });
      
      // Convert to array and sort
      const combinedLeaderboard = Array.from(userScores.values())
        .sort((a, b) => {
          // Sort by percentage score, then by number of quizzes taken
          const aPercent = (a.totalScore / a.totalMaxScore) || 0;
          const bPercent = (b.totalScore / b.totalMaxScore) || 0;
          return bPercent - aPercent || b.quizCount - a.quizCount;
        })
        .slice(0, 20); // Top 20
      
      setLeaderboard(combinedLeaderboard);
    } else {
      // Get leaderboard for specific quiz
      const quizLeaderboard = getLeaderboard(selectedQuizId);
      setLeaderboard(quizLeaderboard);
    }
  }, [selectedQuizId, availableQuizzes, getLeaderboard]);
  
  // Filter leaderboard by search query
  const filteredLeaderboard = searchQuery
    ? leaderboard.filter(entry => entry.username.toLowerCase().includes(searchQuery.toLowerCase()))
    : leaderboard;
  
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-400'; // Gold
      case 1: return 'text-gray-400'; // Silver
      case 2: return 'text-amber-700'; // Bronze
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center mb-2">
              <Trophy className="mr-3 text-amber-400" />
              Leaderboard
            </h1>
            <p className="text-purple-200">
              See who's leading the pack and how you compare
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full sm:w-64 pl-10 p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="p-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Quizzes</option>
              {availableQuizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredLeaderboard.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-purple-200">
              No scores recorded yet. Be the first to complete a quiz!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-purple-900/30 text-left">
                  <th className="px-4 py-3 text-purple-200 font-semibold">Rank</th>
                  <th className="px-4 py-3 text-purple-200 font-semibold">User</th>
                  {selectedQuizId === 'all' ? (
                    <>
                      <th className="px-4 py-3 text-purple-200 font-semibold text-right">Quizzes Taken</th>
                      <th className="px-4 py-3 text-purple-200 font-semibold text-right">Total Score</th>
                      <th className="px-4 py-3 text-purple-200 font-semibold text-right">Average</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-purple-200 font-semibold text-right">Score</th>
                      <th className="px-4 py-3 text-purple-200 font-semibold text-right">Percentage</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map((entry, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-purple-800/30 hover:bg-purple-900/20"
                  >
                    <td className="px-4 py-3 text-white">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <Medal className={`mr-2 ${getMedalColor(index)}`} size={20} />
                        ) : (
                          <span className="w-7 text-center">{index + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{entry.username}</td>
                    {selectedQuizId === 'all' ? (
                      <>
                        <td className="px-4 py-3 text-purple-200 text-right">{entry.quizCount}</td>
                        <td className="px-4 py-3 text-purple-200 text-right">
                          {entry.totalScore} / {entry.totalMaxScore}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-medium px-2 py-1 rounded-full ${
                            entry.totalScore / entry.totalMaxScore >= 0.7
                              ? 'bg-green-900/50 text-green-300'
                              : entry.totalScore / entry.totalMaxScore >= 0.4
                                ? 'bg-amber-900/50 text-amber-300'
                                : 'bg-red-900/50 text-red-300'
                          }`}>
                            {Math.round((entry.totalScore / entry.totalMaxScore) * 100)}%
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-purple-200 text-right">
                          {entry.score} / {entry.maxScore}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-medium px-2 py-1 rounded-full ${
                            entry.score / entry.maxScore >= 0.7
                              ? 'bg-green-900/50 text-green-300'
                              : entry.score / entry.maxScore >= 0.4
                                ? 'bg-amber-900/50 text-amber-300'
                                : 'bg-red-900/50 text-red-300'
                          }`}>
                            {Math.round((entry.score / entry.maxScore) * 100)}%
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;