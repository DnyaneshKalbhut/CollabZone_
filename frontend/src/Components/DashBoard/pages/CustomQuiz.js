import React, { useState } from "react";

const CustomQuiz = ({ onCreateQuiz, resetQuiz }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);

  const addQuestion = () => {
    if (newQuestion.trim() === "" || options.some((opt) => opt.trim() === "")) return;
    setQuestions([...questions, { question: newQuestion, options, correct }]);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrect(0);
  };

  const createQuiz = () => {
    if (title.trim() === "" || questions.length === 0) return;
    onCreateQuiz({ title, questions });
    resetQuiz();
  };

  return (
    <div className="quiz-container">
      <h2>Create Your Own Quiz</h2>
      <input
        type="text"
        placeholder="Enter Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3>Add Questions</h3>
      <input
        type="text"
        placeholder="Enter Question"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      {options.map((opt, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => {
              let newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
          <input
            type="radio"
            name="correctOption"
            checked={correct === index}
            onChange={() => setCorrect(index)}
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>

      {questions.length > 0 && (
        <div>
          <h3>Questions Added:</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                {q.question} - Correct Answer: {q.options[q.correct]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={createQuiz}>Create Quiz</button>
      <button onClick={resetQuiz}>Cancel</button>
    </div>
  );
};

export default CustomQuiz;
