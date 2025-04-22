import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { QuizQuestion } from '../context/QuizContext';

interface QuestionFormProps {
  question: QuizQuestion;
  onUpdate: (updatedQuestion: QuizQuestion) => void;
  onDelete: () => void;
  index: number;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ 
  question, 
  onUpdate, 
  onDelete,
  index
}) => {
  const [isEditing, setIsEditing] = useState(true);
  
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...question,
      question: e.target.value
    });
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    
    onUpdate({
      ...question,
      options: newOptions
    });
  };
  
  const handleCorrectOptionChange = (index: number) => {
    onUpdate({
      ...question,
      correctOptionIndex: index
    });
  };
  
  const addOption = () => {
    if (question.options.length < 6) {
      onUpdate({
        ...question,
        options: [...question.options, '']
      });
    }
  };
  
  const removeOption = (index: number) => {
    if (question.options.length > 2) {
      const newOptions = [...question.options];
      newOptions.splice(index, 1);
      
      // Adjust correct answer index if needed
      let newCorrectIndex = question.correctOptionIndex;
      if (index === question.correctOptionIndex) {
        newCorrectIndex = 0;
      } else if (index < question.correctOptionIndex) {
        newCorrectIndex--;
      }
      
      onUpdate({
        ...question,
        options: newOptions,
        correctOptionIndex: newCorrectIndex
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
        <button 
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Delete question"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <label htmlFor={`question-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Question Text
        </label>
        <input 
          type="text"
          id={`question-${question.id}`}
          value={question.question}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Answer Options
          </label>
          {question.options.length < 6 && (
            <button 
              onClick={addOption}
              className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Option
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <input 
                type="radio"
                id={`option-${question.id}-${idx}`}
                name={`correct-${question.id}`}
                checked={idx === question.correctOptionIndex}
                onChange={() => handleCorrectOptionChange(idx)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <input 
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {question.options.length > 2 && (
                <button 
                  onClick={() => removeOption(idx)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove option"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Select the radio button next to the correct answer.
        </p>
      </div>
    </div>
  );
};

export default QuestionForm;