import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { useQuiz, QuizQuestion } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

const TakeQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getQuizById, submitQuizAttempt } = useQuiz();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(id ? getQuizById(id) : undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (id) {
      const foundQuiz = getQuizById(id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        // Initialize selected options array with -1 (nothing selected)
        setSelectedOptions(new Array(foundQuiz.questions.length).fill(-1));
        // Set timer - 30 seconds per question
        setTimeLeft(foundQuiz.questions.length * 30);
      } else {
        setError('Quiz not found');
      }
    }
  }, [id, getQuizById]);
  
  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted && quiz) {
      // Auto-submit when time runs out
      handleSubmitQuiz();
    }
  }, [timeLeft, quizCompleted]);
  
  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitQuiz = async () => {
    if (!quiz || !currentUser) return;
    
    try {
      setIsSubmitting(true);
      
      // Calculate score
      let correctAnswers = 0;
      const answers = quiz.questions.map((question, index) => {
        const isCorrect = selectedOptions[index] === question.correctOptionIndex;
        if (isCorrect) correctAnswers++;
        
        return {
          questionId: question.id,
          selectedOptionIndex: selectedOptions[index] >= 0 ? selectedOptions[index] : 0,
          isCorrect
        };
      });
      
      // Submit attempt
      await submitQuizAttempt({
        quizId: quiz.id,
        userId: currentUser.id,
        score: correctAnswers,
        maxScore: quiz.questions.length,
        answers
      });
      
      // Update state
      setScore({
        correct: correctAnswers,
        total: quiz.questions.length
      });
      
      setQuizCompleted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit quiz');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
          <div className="flex items-center text-red-200 mb-4">
            <AlertTriangle className="mr-2" />
            <p>{error || 'Quiz not found'}</p>
          </div>
          <button 
            onClick={() => navigate('/quizzes')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            Back to Quiz List
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  if (quizCompleted) {
    const percentage = Math.round((score.correct / score.total) * 100);
    
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Quiz Results</h1>
          
          <div className="mb-8 flex flex-col items-center">
            <div className={`text-6xl font-bold mb-4 ${
              percentage >= 70 ? 'text-green-400' : percentage >= 40 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {percentage}%
            </div>
            <div className="text-xl text-white mb-2">
              You scored {score.correct} out of {score.total}
            </div>
            <div className="flex items-center text-purple-200">
              {percentage >= 70 ? (
                <CheckCircle className="mr-2 text-green-400" />
              ) : (
                <XCircle className="mr-2 text-red-400" />
              )}
              {percentage >= 70 
                ? "Great job! You've mastered this quiz." 
                : percentage >= 40 
                  ? "Good effort! Keep practicing to improve." 
                  : "Keep studying! You'll get better with practice."}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/quizzes')}
              className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Find More Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
            <p className="text-purple-200 text-sm">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2 bg-purple-900/50 px-4 py-2 rounded-full">
            <Clock className="text-amber-400" size={18} />
            <span className={`font-mono text-white ${timeLeft < 30 ? 'text-red-400' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            {error}
          </div>
        )}
        
        <div className="bg-white/5 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-medium text-white mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedOptions[currentQuestionIndex] === index
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`py-2 px-4 rounded-lg ${
              currentQuestionIndex === 0
                ? 'bg-gray-500 cursor-not-allowed opacity-50'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            Previous
          </button>
          
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className={`bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg flex items-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center"
            >
              Next
              <ArrowRight size={18} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;