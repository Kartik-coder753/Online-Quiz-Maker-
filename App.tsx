import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuizList from './pages/QuizList';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <div className="min-h-screen flex flex-col">
            <AnimatedBackground />
            <Header />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/create-quiz" element={<CreateQuiz />} />
                <Route path="/quiz/:id" element={<TakeQuiz />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;