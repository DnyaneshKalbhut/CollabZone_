import React, { useState, useEffect } from "react";
import "../Quiz/Quiz1.css";

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const cssQuestions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correct: 0,
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["background-color", "bgcolor", "color", "background"],
    correct: 0,
  },
  {
    question: "How do you add a comment in CSS?",
    options: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "// Comment",
    ],
    correct: 2,
  },
  {
    question:
      "Which of the following CSS properties is used to change the text color?",
    options: ["color", "font-color", "text-color", "color-text"],
    correct: 0,
  },
  {
    question: "Which CSS property controls the spacing between letters?",
    options: ["letter-spacing", "word-spacing", "line-spacing", "text-spacing"],
    correct: 0,
  },
];

const Quiz2 = ({ resetQuiz }) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed
  const [shuffledQuestions, setShuffledQuestions] = useState(cssQuestions);

  const handleNext = () => {
    if (selectedOption === null) return; // Don't allow to proceed without selecting an answer.

    // Check if the answer is correct, if so, add 10 to the score, else 0
    if (selectedOption === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 10);
    }

    // Move to the next question or end the quiz
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(10);
    } else {
      setQuizCompleted(true); // Mark the quiz as completed
    }
  };

  useEffect(() => {
    if (start && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleNext();
    }
  }, [timeLeft, start, quizCompleted]);

  const handleOptionClick = (index) => {
    setSelectedOption(index); // Store the selected answer
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setTimeLeft(10);
    setQuizCompleted(false);
    setStart(true);
    setShuffledQuestions(shuffleArray(cssQuestions)); // Shuffle questions on restart
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="quiz-container">
      {!start ? (
        <div>
          <h2>Enter your name to start the quiz</h2>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
          <button
            onClick={() => setStart(true)}
            disabled={!name.trim()} // Disable the button if no name is entered
          >
            Start Quiz
          </button>
        </div>
      ) : quizCompleted ? (
        // Display result and options after completing the quiz
        <div className="quiz-result">
          <h2>
            {name}, you scored {score} out of {shuffledQuestions.length * 10}!
          </h2>
          <div className="quiz-actions">
            <button onClick={handleRestartQuiz}>Restart Quiz</button>
            <button onClick={resetQuiz}>Go Back to Quiz Selection</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestion + 1}:</h2>
          <h3>{shuffledQuestions[currentQuestion].question}</h3>
          <ul>
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                className={selectedOption === index ? "selected" : ""}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </li>
            ))}
          </ul>
          <p>Time left: {timeLeft} seconds</p>
          <button onClick={handleNext} disabled={selectedOption === null}>
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz2;
