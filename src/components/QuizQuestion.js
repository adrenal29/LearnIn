import React, { useState, useEffect } from 'react';

const QuizQuestion = ({ question, options, difficulty ,correctAns,handleAnswer}) => {
  const [selectedOption, setSelectedOption] = useState(null);


  

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <h4 className='text-red-300'>{difficulty}</h4>
      <div className="grid grid-cols-1 gap-4">
        {options?.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-full ${
              selectedOption === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleAnswer(option,correctAns,question,difficulty)}
          >
            {option}
          </button>
        ))}
      </div>
    
    </div>
  );
};

export default QuizQuestion;
