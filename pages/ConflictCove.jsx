import { useState } from "react";

const ConflictCove = () => {
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
      question: "How should you approach a colleague with whom you have a disagreement?",
      options: [
        {
          text: "Argue your point until they agree.",
          isCorrect: false,
          feedback: "Arguing only escalates the situation. Focus on understanding their perspective."
        },
        {
          text: "Listen actively and find common ground.",
          isCorrect: true,
          feedback: "Excellent! Active listening and finding mutual understanding is crucial for conflict resolution."
        }
      ]
    },
    {
      question: "What’s the best first step when resolving team conflict?",
      options: [
        {
          text: "Avoid confrontation and let things calm down.",
          isCorrect: false,
          feedback: "Avoiding conflict may lead to resentment. Address issues calmly and respectfully."
        },
        {
          text: "Acknowledge the issue and facilitate an open discussion.",
          isCorrect: true,
          feedback: "Great choice! Addressing the issue head-on is key to resolving conflicts constructively."
        }
      ]
    },
    {
      question: "Which technique is best for de-escalating tense situations?",
      options: [
        {
          text: "Stay calm and speak slowly to lower the emotional temperature.",
          isCorrect: true,
          feedback: "Exactly! Calm, controlled communication helps reduce tension and encourages productive dialogue."
        },
        {
          text: "Raise your voice to make your point clear.",
          isCorrect: false,
          feedback: "Raising your voice can escalate the situation. Calm communication is much more effective."
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
      return "🌟 You did a great job handling conflict with respect and understanding!";
    } else if (retryCount === 1) {
      return "✅ Solid work! You're improving at managing conflict, but some areas need attention.";
    } else if (retryCount === 2) {
      return "⚠️ You're getting closer! Focus on being calm and solution-oriented in tense situations.";
    } else {
      return "🔄 Let's take another look at how to better resolve conflict. Keep practicing!";
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="max-container">
      <h1 className="head-text">
        Welcome to{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Conflict Cove
        </span>{" "}
        🌋
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500 text-2xl">
        <p>
          Learn how to resolve conflicts effectively! Answer questions on handling challenging situations at work.
        </p>
      </div>

      {!showQuiz && !showFeedback && !quizCompleted && (
        <button className="start-quiz-btn" onClick={handleStartQuiz}>
          Start the Conflict Quiz
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

export default ConflictCove;
