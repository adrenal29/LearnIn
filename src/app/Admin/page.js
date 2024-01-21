"use client"
import React, { useState } from 'react';

const AdminPanel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState({
    testName: '',
    duration: '',
    questions: []
  });


  const addQuestion = (question) => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        difficulty: '',
      },
    ]);
    console.log(questions)
  };
  const addTest=(testDetails)=>{
    console.log(testDetails.testName)
    console.log([...questions])
  }
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mx-auto mt-8 p-8  rounded-lg ">
      <div className="mb-4">
        <label htmlFor="language" className="text-lg font-semibold mr-2">
          Select Language:
        </label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border p-2 rounded-md outline-none"
        >
          <option value="english">English</option>
          {/* Add other language options */}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="testName" className="text-lg font-semibold block mb-2">
          Test Name:
        </label>
        <input
          type="text"
          id="testName"
          value={testDetails.testName}
          onChange={(e) => setTestDetails({ ...testDetails, testName: e.target.value })}
          className="w-full border p-2 rounded-md outline-none"
        />
        {/* Add other test details inputs */}

        <button
          onClick={() => addTest(testDetails)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-700"
        >
          Add Test
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Add Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`questionText${index}`} className="text-lg font-semibold block mb-2">
              Question Text:
            </label>
            <input
              type="text"
              id={`questionText${index}`}
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              className="w-full border p-2 rounded-md outline-none"
            />

            <div className="flex flex-wrap -mx-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="w-1/2 px-2 mt-2">
                  <label htmlFor={`option${index}${optionIndex}`} className="text-lg font-semibold block mb-2">
                    Option {String.fromCharCode(65 + optionIndex)}:
                  </label>
                  <input
                    type="text"
                    id={`option${index}${optionIndex}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    className="w-full border p-2 rounded-md outline-none"
                  />
                </div>
              ))}
            </div>

            <label htmlFor={`difficulty${index}`} className="text-lg font-semibold block mb-2 mt-2">
              Difficulty:
            </label>
            <input
              type="text"
              id={`difficulty${index}`}
              value={question.difficulty}
              onChange={(e) => handleQuestionChange(index, 'difficulty', e.target.value)}
              className="w-full border p-2 rounded-md outline-none"
            />

            <button
              onClick={() => addQuestion(question)}
              className="bg-green-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-green-700"
            >
              Add Question
            </button>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
        >
          Add New Question
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
