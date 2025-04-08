import { useState } from "react";

const ClarityCliffs = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [wasCorrect, setWasCorrect] = useState(false);
  const [attemptedBefore, setAttemptedBefore] = useState(false);
  const [questionsNeedingRetry, setQuestionsNeedingRetry] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // NEW

  const questions = [
    {
      question: "Which phrase best demonstrates active listening amongst colleagues?",
      options: [
        {
          text: "So what I’m hearing is…",
          isCorrect: true,
          feedback: "Good job! This is a clear, reflective response that conveys understanding and gives way to additions in a healthy professional manner."
        },
        {
          text: "Let me tell you what I think.",
          isCorrect: false,
          feedback: "This response doesn't show you are listening. It conveys eagerness to respond, not intentional listening."
        }
      ]
    },
    {
      question: "What’s the best way to clarify a misunderstanding in a meeting?",
      options: [
        {
          text: "Jump in and explain your view.",
          isCorrect: false,
          feedback: "Interrupting can cause confusion. Try to clarify politely by asking questions and restating your understanding."
        },
        {
          text: "Ask questions and restate what you heard.",
          isCorrect: true,
          feedback: "Great choice! This shows you value clarity and understanding when conversing with coworkers and managers."
        }
      ]
    },
    {
      question: "Which approach helps ensure clarity in emails about important or sensitive information?",
      options: [
        {
          text: "Be concise and get straight to the point.",
          isCorrect: true,
          feedback: "Exactly! Clear and direct communication is key. Use formatting tools to highlight specific and necessary information."
        },
        {
          text: "Write long, detailed explanations.",
          isCorrect: false,
          feedback: "Long emails can confuse the reader, especially when dealing with important and/or sensitive information. Be succinct."
        }
      ]
    }
  ];

  const handleAnswer = (isCorrect, feedback) => {
    setFeedbackMessage(feedback);
    setShowFeedback(true);
    setWasCorrect(isCorrect);

    if (!isCorrect) {
      setAttemptedBefore(true);
    } else if (attemptedBefore && !questionsNeedingRetry.includes(currentQuestionIndex)) {
      setQuestionsNeedingRetry([...questionsNeedingRetry, currentQuestionIndex]);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);

    if (wasCorrect) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAttemptedBefore(false);
      } else {
        setShowQuiz(false);
        setQuizCompleted(true); // ✅ Show summary
      }
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setAttemptedBefore(false);
    setQuestionsNeedingRetry([]);
  };

  const getFinalFeedback = () => {
    const retryCount = questionsNeedingRetry.length;

    if (retryCount === 0) {
      return "🌟 You demonstrated strong clarity and precision throughout the quiz — great job!";
    } else if (retryCount === 1) {
      return "✅ Solid performance! You have a strong grasp on clarity, but there's always room to fine-tune.";
    } else if (retryCount === 2) {
      return "⚠️ You’re getting there! A bit more focus on clear communication will help sharpen your skills.";
    } else {
      return "🔄 Let’s take another look at how to express and receive ideas clearly — keep practicing!";
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="max-container">
      <h1 className="head-text">
        Welcome to{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Clarity Cliffs
        </span>{" "}
        💧
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500 text-2xl">
        <p>
          Explore the power of clarity in your professional journey! Answer
          situational questions to reflect on your communication skills and
          earn feedback along the way.
        </p>
      </div>

      {!showQuiz && !showFeedback && !quizCompleted && (
        <button className="start-quiz-btn" onClick={handleStartQuiz}>
          Start the Clarity Quiz
        </button>
      )}

      {showQuiz && (
        <div className="quiz-popup">
          <h2 className="text-3xl font-bold mt-2 text-center">REFLECTION QUIZ</h2>

          <p className="text-5xl font-semibold text-center my-6 text-slate-800">
            {currentQuestion?.question}
          </p>

          {!showFeedback && (
            <div className="quiz-options flex flex-col gap-4 items-center flex justify-center">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.isCorrect, option.feedback)}
                  className="gradient-background quiz-option-btn "
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {showFeedback && (
        <div className="feedback-popup text-center text-2xl mt-8">
          <p>{feedbackMessage}</p>
          <button className="start-quiz-btn mt-4" onClick={handleNextQuestion}>
            {wasCorrect ? "Next Question" : "Try Again"}
          </button>
        </div>
      )}

      {quizCompleted && (
        <div className="quiz-summary text-center mt-10">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <p className="text-xl mt-4">{getFinalFeedback()}</p>

          <button className="start-quiz-btn mt-6" onClick={handleStartQuiz}>
            Retry the Quiz
          </button>
        </div>
      )}
    </section>
  );
};

export default ClarityCliffs;
