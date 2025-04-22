import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuiz, QuizQuestion } from '../context/QuizContext';
import QuestionForm from '../components/QuestionForm';

const CreateQuiz: React.FC = () => {
  const { currentUser } = useAuth();
  const { createQuiz } = useQuiz();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: `q-${Date.now()}`,
      question: '',
      options: ['', ''],
      correctOptionIndex: 0
    }
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q-${Date.now()}-${questions.length}`,
        question: '',
        options: ['', ''],
        correctOptionIndex: 0
      }
    ]);
  };
  
  const updateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };
  
  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    }
  };
  
  const validateQuiz = () => {
    if (!title.trim()) {
      setError('Please enter a quiz title');
      return false;
    }
    
    if (!description.trim()) {
      setError('Please enter a quiz description');
      return false;
    }
    
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setError(`Question ${i + 1} is empty`);
        return false;
      }
      
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setError(`Option ${j + 1} in question ${i + 1} is empty`);
          return false;
        }
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!validateQuiz()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const quiz = await createQuiz({
        title,
        description,
        questions,
        creatorId: currentUser.id,
        isPublished: true
      });
      
      navigate(`/quiz/${quiz.id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to create quiz');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Create a New Quiz</h1>
        
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-purple-200 mb-1">
              Quiz Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter quiz title"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-purple-200 mb-1">
              Quiz Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter a description for your quiz"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Add Question
              </button>
            </div>
            
            {questions.map((question, index) => (
              <QuestionForm
                key={question.id}
                question={question}
                onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                onDelete={() => removeQuestion(index)}
                index={index}
              />
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mr-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg flex items-center transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-amber-400 hover:bg-amber-500 text-gray-900 py-2 px-6 rounded-lg flex items-center transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? 'Creating...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;