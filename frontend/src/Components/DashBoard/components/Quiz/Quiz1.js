import React, { useState, useEffect } from "react";
import "../Quiz/Quiz1.css"; // Import the CSS file

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<style>", "<css>", "<stylesheet>"],
    correct: 1,
  },
  {
    question:
      "Which attribute is used to provide a unique identifier to an HTML element?",
    options: ["class", "id", "name", "key"],
    correct: 1,
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<br>", "<lb>", "<line>"],
    correct: 1,
  },
  {
    question: "Which of these elements are all <table> elements?",
    options: [
      "<table> <head> <tfoot>",
      "<thead> <body> <tr>",
      "<table> <tr> <td>",
      "<table> <tr> <tt>",
    ],
    correct: 2,
  },
];

const Quiz1 = ({ resetQuiz }) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);

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
  }, [timeLeft, start, quizCompleted, handleNext]); // Add handleNext here

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
    setShuffledQuestions(shuffleArray(questions)); // Shuffle questions on restart
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

export default Quiz1;
