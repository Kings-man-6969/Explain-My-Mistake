import type { FormattedResponse } from './types';
import { SubjectDomain, ToneMode } from './types';

const API_BASE = 'http://localhost:3000/api';

export const submitQuestion = async (
    userId: string,
    question: string,
    attemptedAnswer: string,
    subject: SubjectDomain,
    tonePreference: ToneMode,
    isDemoMode: boolean = false
): Promise<{ success: boolean; submissionId: string; result?: FormattedResponse; error?: any }> => {
    try {
        const response = await fetch(`${API_BASE}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                question,
                attemptedAnswer,
                subject,
                tonePreference,
                isDemoMode,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Submission failed');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, submissionId: '', error };
    }
};
