import React, { createContext, useState, useContext, useEffect } from 'react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  questions: QuizQuestion[];
  isPublished: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  maxScore: number;
  completedAt: Date;
  answers: {
    questionId: string;
    selectedOptionIndex: number;
    isCorrect: boolean;
  }[];
}

interface QuizContextType {
  quizzes: Quiz[];
  userAttempts: QuizAttempt[];
  loadQuizzes: () => void;
  getQuizById: (id: string) => Quiz | undefined;
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => Promise<Quiz>;
  updateQuiz: (id: string, data: Partial<Quiz>) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => Promise<QuizAttempt>;
  getUserAttempts: (userId: string) => QuizAttempt[];
  getLeaderboard: (quizId: string) => { username: string; score: number; maxScore: number }[];
}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userAttempts, setUserAttempts] = useState<QuizAttempt[]>([]);

  // Load quizzes from localStorage on initial load
  useEffect(() => {
    loadQuizzes();
    const storedAttempts = localStorage.getItem('quizAttempts');
    if (storedAttempts) {
      setUserAttempts(JSON.parse(storedAttempts));
    }
  }, []);

  const loadQuizzes = () => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  };

  const getQuizById = (id: string) => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const createQuiz = async (quizData: Omit<Quiz, 'id' | 'createdAt'>): Promise<Quiz> => {
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz-${Date.now()}`,
      createdAt: new Date(),
    };
    
    const updatedQuizzes = [...quizzes, newQuiz];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    
    return newQuiz;
  };

  const updateQuiz = async (id: string, data: Partial<Quiz>): Promise<void> => {
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === id ? { ...quiz, ...data } : quiz
    );
    
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const deleteQuiz = async (id: string): Promise<void> => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const submitQuizAttempt = async (
    attemptData: Omit<QuizAttempt, 'id' | 'completedAt'>
  ): Promise<QuizAttempt> => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `attempt-${Date.now()}`,
      completedAt: new Date(),
    };
    
    const updatedAttempts = [...userAttempts, newAttempt];
    setUserAttempts(updatedAttempts);
    localStorage.setItem('quizAttempts', JSON.stringify(updatedAttempts));
    
    return newAttempt;
  };

  const getUserAttempts = (userId: string) => {
    return userAttempts.filter(attempt => attempt.userId === userId);
  };

  const getLeaderboard = (quizId: string) => {
    // Get all attempts for this quiz
    const quizAttempts = userAttempts.filter(attempt => attempt.quizId === quizId);
    
    // Group by user and get best score
    const userBestScores = new Map<string, { username: string; score: number; maxScore: number }>();
    
    quizAttempts.forEach(attempt => {
      const existingBest = userBestScores.get(attempt.userId);
      if (!existingBest || (attempt.score > existingBest.score)) {
        // In a real app, you'd get the username from a users collection
        userBestScores.set(attempt.userId, {
          username: `user-${attempt.userId.substring(0, 5)}`,
          score: attempt.score,
          maxScore: attempt.maxScore
        });
      }
    });
    
    // Sort by score (descending)
    return Array.from(userBestScores.values())
      .sort((a, b) => b.score - a.score);
  };

  const value = {
    quizzes,
    userAttempts,
    loadQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    submitQuizAttempt,
    getUserAttempts,
    getLeaderboard
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};