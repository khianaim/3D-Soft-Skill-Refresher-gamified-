"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Using useNavigate instead of useHistory

const OnboardingSummary = ({ quizResults }) => {
  const [feedbackMessage, setFeedbackMessage] = useState(""); // State to hold feedback message
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Aggregate feedback based on the quiz results
  const getSummaryFeedback = () => {
    // Map each quiz result to its respective skill
    const results = {
      Empathy: quizResults.EmpathyBay,
      Resolution: quizResults.ConflictCove,
      Communication: quizResults.ClarityCliffs,
    };
  
    // Initialize arrays to hold the feedback and modules for revisit
    let summaryFeedback = [];
    let revisitModules = [];
  
    // Loop through each skill to generate feedback based on retry count
    for (let skill in results) {
      const quizResult = results[skill];
      
      // Customize feedback based on the retry count
      if (quizResult.retryCount === 0) {
        summaryFeedback.push(`${skill}: Excellent performance! Keep it up.`);
      } else if (quizResult.retryCount === 1) {
        summaryFeedback.push(`${skill}: Good job, but a little more practice will help you improve.`);
        revisitModules.push(skill); // Add to revisit list if only one retry
      } else if (quizResult.retryCount >= 2) {
        summaryFeedback.push(`${skill}: More practice is needed to refine your skills in this area.`);
        revisitModules.push(skill); // Add to revisit list if two or more retries
      }
    }
  
    return { summaryFeedback, revisitModules };
  };
  

  const { summaryFeedback, revisitModules } = getSummaryFeedback();

  // Function to handle redirection for further modules or sections
  const handleRevisitModule = (skill) => {
    let feedbackMessage = "";

    switch (skill) {
      case "Empathy":
        feedbackMessage =
          "Empathy: You’ve demonstrated great empathy in handling challenges. Keep practicing to refine your skills.";
        navigate("/empathybay");
        break;
      case "ConflictResolution":
        feedbackMessage =
          "Conflict Resolution: You’ve shown strong skills in resolving conflicts. A bit more practice will help you handle more complex situations.";
        navigate("/conflictcove");
        break;
      case "Communication":
        feedbackMessage =
          "Clarity in Communication: Your communication skills are clear, but keep working on delivering even more concise messages in high-pressure situations.";
        navigate("/claritycliffs");
        break;
      default:
        feedbackMessage = "No specific feedback available.";
        break;
    }

    // Set the feedback message to show it in the UI after navigating
    setFeedbackMessage(feedbackMessage);
  };

  return (
    <section className="max-container">
      <h1 className="head-text">Onboarding Summary</h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500 text-2xl">
        <p>
          Here’s an overview of your performance across all modules. Review your
          results and take actions to strengthen any areas that need improvement.
        </p>
      </div>

      <div className="quiz-summary">
        <h2 className="text-4xl font-bold mt-6">Quiz Feedback</h2>
        <div className="text-xl mt-4">
            {summaryFeedback.map((feedback, index) => (
            <p key={index}>{feedback}</p> // Display each feedback item in a separate paragraph
            ))}
        </div>

        <h3 className="text-4xl font-bold mt-6">Modules to Revisit :</h3>
        {revisitModules.length > 0 ? (
            <ul className="revisit-list">
            {revisitModules.map((module, index) => (
                <li key={index}>
                <button
                    onClick={() => handleRevisitModule(module)}
                    className="start-quiz-btn"
                >
                 {module}
                </button>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-xl mt-2">Great job! No need for any revisits at this time.</p>
        )}
        </div>


      <div className="next-step">
        <h3 className="text-4xl font-bold mt-6">Next Steps</h3>
        <p className="text-xl mt-2">
          You've completed the onboarding quizzes. Continue to explore the rest of the
          onboarding materials or start your training modules.
        </p>
        <button className="start-quiz-btn mt-4" onClick={() => navigate("/")}>
          Start Training Modules
        </button>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mt-4">Feedback:</h3>
        <p className="text-xl">{feedbackMessage}</p>
      </div>
    </section>
  );
};

export default OnboardingSummary;
