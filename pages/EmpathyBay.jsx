import { useState } from "react";

const EmpathyBay = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [wasCorrect, setWasCorrect] = useState(false);
  const [attemptedBefore, setAttemptedBefore] = useState(false);
  const [questionsNeedingRetry, setQuestionsNeedingRetry] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "How can you show empathy in a conversation with a colleague?",
      options: [
        {
          text: "Listen attentively and acknowledge their feelings.",
          isCorrect: true,
          feedback: "Great! Empathy is about listening deeply and acknowledging others' emotions."
        },
        {
          text: "Interrupt them to offer a solution.",
          isCorrect: false,
          feedback: "Interrupting can make someone feel unheard. Let them share first."
        }
      ]
    },
    {
      question: "What’s the best way to respond when a colleague is upset about a project?",
      options: [
        {
          text: "Tell them to calm down and focus on the task.",
          isCorrect: false,
          feedback: "This approach can be dismissive. It's better to acknowledge their feelings first."
        },
        {
          text: "Express understanding and ask how you can support them.",
          isCorrect: true,
          feedback: "Good choice! Showing understanding and offering support can diffuse tension."
        }
      ]
    },
    {
      question: "Which action helps build trust in a team environment?",
      options: [
        {
          text: "Being honest and transparent in your communication.",
          isCorrect: true,
          feedback: "Exactly! Transparency and honesty are key to building trust in relationships."
        },
        {
          text: "Avoiding difficult conversations to prevent conflict.",
          isCorrect: false,
          feedback: "Avoiding tough talks can lead to misunderstandings. It's better to address issues openly."
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
        setQuizCompleted(true);
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
      return "🌟 You demonstrated excellent empathy throughout the quiz — well done!";
    } else if (retryCount === 1) {
      return "✅ Nice work! You’re getting the hang of empathetic responses, but practice can make you even better.";
    } else if (retryCount === 2) {
      return "⚠️ Almost there! Continue to work on understanding others' emotions and responses more thoughtfully.";
    } else {
      return "🔄 Let’s reflect more on how to empathize better. Keep practicing!";
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="max-container">
      <h1 className="head-text">
        Welcome to{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Empathy Bay
        </span>{" "}
        🌊
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500 text-2xl">
        <p>
          Explore the power of empathy in professional relationships! Answer
          situational questions to reflect on your empathy skills and earn feedback along the way.
        </p>
      </div>

      {!showQuiz && !showFeedback && !quizCompleted && (
        <button className="start-quiz-btn" onClick={handleStartQuiz}>
          Start the Empathy Quiz
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

export default EmpathyBay;
