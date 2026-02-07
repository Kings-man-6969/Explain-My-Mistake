import { useState } from 'react';
import { SubmissionForm } from './components/SubmissionForm';
import { AnalysisResult } from './components/AnalysisResult';
import { submitQuestion } from './api';
import type { FormattedResponse } from './types';
import { SubjectDomain, ToneMode } from './types';
import './App.css';

function App() {
  const [result, setResult] = useState<FormattedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmission = async (data: {
    question: string;
    attemptedAnswer: string;
    subject: SubjectDomain;
    tonePreference: ToneMode;
  }) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Hardcoded user ID for demo
    const userId = "demo-user-123";

    try {
      const response = await submitQuestion(
        userId,
        data.question,
        data.attemptedAnswer,
        data.subject,
        data.tonePreference,
        true // Enable demo mode
      );

      if (response.success && response.result) {
        setResult(response.result);
      } else {
        setError("Analysis failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please checks your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Explain My Mistake</h1>
        <p>Understand how you think when you're wrong.</p>
      </header>

      <main>
        <SubmissionForm onSubmit={handleSubmission} isLoading={isLoading} />

        {error && <div className="error-message">{error}</div>}

        {result && <AnalysisResult result={result} />}
      </main>
    </div>
  );
}

export default App;
