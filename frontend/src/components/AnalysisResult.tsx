import React from 'react';
import type { FormattedResponse } from '../types';

interface Props {
    result: FormattedResponse;
}

export const AnalysisResult: React.FC<Props> = ({ result }) => {
    return (
        <div className="card result-card">
            <div className="result-header">
                <h2>Learning Insight</h2>
                {result.answerSafeBadge && (
                    <span className="badge safe-mode" title="We focus on your thinking process, not just the answer.">
                        Answer-Safe Mode: ON
                    </span>
                )}
            </div>

            <div className="result-section diagnosis">
                <h3> Diagnosis</h3>
                <p>{result.errorDiagnosis}</p>
            </div>

            <div className="result-section concept">
                <h3> Concept Gap</h3>
                <p><strong>{result.conceptExplanation}</strong></p>
            </div>

            <div className="result-section guidance">
                <h3> Guidance</h3>
                <ul className="guidance-list">
                    {result.reasoningGuidance.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ul>
            </div>

            <div className="result-section socratic">
                <h3> Reflective Question</h3>
                <p className="socratic-q"><em>{result.socraticQuestion}</em></p>
            </div>

            <div className="result-section proof">
                <h3> Proof of Learning</h3>
                <p className="proof-text">{result.proofOfLearning}</p>
            </div>

            <div className="result-footer">
                <p className="encouragement">{result.encouragement}</p>
            </div>
        </div>
    );
};
