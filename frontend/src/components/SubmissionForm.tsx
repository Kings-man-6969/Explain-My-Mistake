import React, { useState } from 'react';
import { SubjectDomain, ToneMode } from '../types';

interface Props {
    onSubmit: (data: {
        question: string;
        attemptedAnswer: string;
        subject: SubjectDomain;
        tonePreference: ToneMode;
    }) => void;
    isLoading: boolean;
}

export const SubmissionForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
    const [question, setQuestion] = useState('');
    const [attemptedAnswer, setAttemptedAnswer] = useState('');
    const [subject, setSubject] = useState<SubjectDomain>(SubjectDomain.CODING);
    const [tone, setTone] = useState<ToneMode>(ToneMode.GENTLE);

    return (
        <div className="card">
            <h2>Submit Your Mistake</h2>
            <div className="form-group">
                <label>Question</label>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    rows={3}
                    placeholder="e.g. Write a function to reverse a string..."
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <label>Your Attempt</label>
                <textarea
                    value={attemptedAnswer}
                    onChange={(e) => setAttemptedAnswer(e.target.value)}
                    required
                    rows={5}
                    placeholder="Paste your code or reasoning here..."
                    disabled={isLoading}
                />
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Subject</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value as SubjectDomain)}
                        disabled={isLoading}
                    >
                        {Object.values(SubjectDomain).map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Tone</label>
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value as ToneMode)}
                        disabled={isLoading}
                    >
                        {Object.values(ToneMode).map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={() => onSubmit({ question, attemptedAnswer, subject, tonePreference: tone })}
                disabled={isLoading || !question || !attemptedAnswer}
                className="submit-btn"
            >
                {isLoading ? 'Analyzing...' : 'Analyze Mistake'}
            </button>
        </div>
    );
};
