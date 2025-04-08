import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { ClarityCliffs, EmpathyBay, Home, ConflictCove, OnboardingSummary } from "./pages";

const App = () => {
  // State to hold quiz results for all modules
  const [quizResults, setQuizResults] = useState({
    EmpathyBay: { retryCount: 0 },
    ConflictCove: { retryCount: 1 },
    ClarityCliffs: { retryCount: 2 },
  });

  return (
    <main className="bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<EmpathyBay />} />
          <Route path="/projects" element={<ConflictCove />} />
          <Route path="/contact" element={<ClarityCliffs />} />
          <Route
            path="/onboardingsummary"
            element={<OnboardingSummary quizResults={quizResults} />}
          />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
