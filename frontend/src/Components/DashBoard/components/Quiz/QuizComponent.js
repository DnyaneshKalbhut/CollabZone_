import React, { useState, useEffect } from "react";
import "../../styles/Quiz.css"; // Use the same styles as Quiz1

const QuizComponent = ({ quizData, resetQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleNext();
    }
  }, [timeLeft, quizCompleted]);

  const handleNext = () => {
    if (selectedOption === null) return;

    if (selectedOption === quizData.questions[currentQuestion].correct) {
      setScore(score + 10);
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(10);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        <>
          <h2>{quizData.title}</h2>
          <h3>Question {currentQuestion + 1}:</h3>
          <p>{quizData.questions[currentQuestion].question}</p>
          <ul>
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                className={selectedOption === index ? "selected" : ""}
                onClick={() => setSelectedOption(index)}
              >
                {option}
              </li>
            ))}
          </ul>
          <p>Time left: {timeLeft} seconds</p>
          <button onClick={handleNext} disabled={selectedOption === null}>
            Submit Answer
          </button>
        </>
      ) : (
        <div className="quiz-result">
          <h2>You scored {score} out of {quizData.questions.length * 10}!</h2>
          <button onClick={resetQuiz}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
