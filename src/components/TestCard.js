import React from 'react'

const TestCard = (props) => {
    return(
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white ml-8 mt-4">
    {/* Test Thumbnail */}
    <img className="w-full h-40 object-cover rounded-t" src="./Hero.png" alt="Test Thumbnail" />
  
    {/* Test Information */}
    <div className="px-6 py-4">
      {/* Test Language */}
      <div className="text-gray-700 font-bold text-xl mb-2">Test Language: English</div>
  
      {/* Test Duration */}
      <p className="text-gray-600 text-sm mb-2">Duration: 1 Hour</p>
  
      {/* Number of Questions */}
      <p className="text-gray-600 text-sm mb-2">Number of Questions: 20</p>
  
      {/* Number of Students Attempted */}
      <p className="text-gray-600 text-sm mb-2">Students Attempted: 100</p>
  
      {/* Max Marks */}
      <p className="text-gray-600 text-sm mb-2">Max Marks: 100</p>
    </div>
  
    {/* Start Test Button */}
    <div className="px-6 py-3 flex justify-end">
      <button className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105" onClick={props.setQuiz}>
        Start Test
      </button>
    </div>
  </div>
    )
}

export default TestCard
