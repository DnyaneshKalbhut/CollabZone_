import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import Quiz1 from "../components/Quiz/Quiz1";
import Quiz2 from "../components/Quiz/Quiz2";
import Quiz3 from "../components/Quiz/Quiz3";
import CustomQuiz from "./CustomQuiz";
import QuizComponent from "./QuizComponent"; // New Generic Quiz Component

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [customQuizzes, setCustomQuizzes] = useState([]); // Store user-created quizzes

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
  };

  const handleCreateQuiz = (newQuiz) => {
    setCustomQuizzes([...customQuizzes, newQuiz]);
    setSelectedQuiz(newQuiz); // Pass the entire quiz object
  };

  return (
    <div>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>This is Quiz Window</h1>

          {!selectedQuiz ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              {/* Default Quizzes */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" onClick={() => handleQuizSelect("quiz1")}>
                  Quiz 1 (HTML)
                </Button>
                <Button variant="contained" onClick={() => handleQuizSelect("quiz2")}>
                  Quiz 2 (CSS)
                </Button>
                <Button variant="contained" onClick={() => handleQuizSelect("quiz3")}>
                  Quiz 3 (JavaScript)
                </Button>
              </Box>

              {/* Create Custom Quiz Button */}
              <Button variant="outlined" onClick={() => handleQuizSelect("createQuiz")}>
                + Create Your Own Quiz
              </Button>

              {/* List of User-Created Quizzes */}
              {customQuizzes.length > 0 && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {customQuizzes.map((quiz, index) => (
                    <Button key={index} variant="contained" onClick={() => handleQuizSelect(quiz)}>
                      {quiz.title}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              {selectedQuiz === "quiz1" && <Quiz1 resetQuiz={resetQuiz} />}
              {selectedQuiz === "quiz2" && <Quiz2 resetQuiz={resetQuiz} />}
              {selectedQuiz === "quiz3" && <Quiz3 resetQuiz={resetQuiz} />}
              {selectedQuiz === "createQuiz" && <CustomQuiz onCreateQuiz={handleCreateQuiz} resetQuiz={resetQuiz} />}
              {typeof selectedQuiz === "object" && <QuizComponent quizData={selectedQuiz} resetQuiz={resetQuiz} />}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Quiz;
