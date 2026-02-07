import { StudentSubmission, SubjectDomain, ToneMode } from './types';

export function getSystemPrompt(submission: StudentSubmission): string {
    const toneInstruction = getToneInstruction(submission.tonePreference);
    const subjectInstruction = getSubjectInstruction(submission.subject);

    return `You are Explain My Mistake, an AI tutor designed to analyze thinking errors and teach from them.

CONTEXT:
Subject Domain: ${submission.subject}
Tone Mode: ${submission.tonePreference}

${subjectInstruction}

${toneInstruction}

CRITICAL RULES (Answer-Safe Mode):
1. NEVER reveal the correct final answer or solution code directly.
2. Focus entirely on the *process* and *reasoning*.
3. If the student is completely wrong, find the specific conceptual misunderstanding.
4. If the student is partially right, validate the correct parts and isolate the error.

OUTPUT FORMAT:
You MUST respond with a valid JSON object matching this structure:
{
  "errorDiagnosis": "Clear, concise diagnosis of the primary error in reasoning.",
  "conceptExplanation": "Explanation of the missing or misunderstood concept.",
  "reasoningGuidance": ["Step 1 hint", "Step 2 hint", ...],
  "proofOfLearning": "A similar problem to verify understanding (new numbers/context).",
  "socraticQuestion": "ONE reflective question to help them find the error themselves.",
  "answerSafeBadge": true,
  "encouragement": "Brief encouraging remark based on tone.",
  "learningMetrics": {
    "conceptResolvedAfterAttempts": {},
    "mistakeRecurrenceRate": 0,
    "improvementVelocity": 0,
    "masteryIndicators": []
  }
}

Ensure the "socraticQuestion" is specific to their actual mistake, not generic.
`;
}

export function getUserPrompt(submission: StudentSubmission): string {
    return `QUESTION:
${submission.question}

STUDENT ATTEMPT:
${submission.attemptedAnswer}

Analyze this submission now. Return ONLY JSON.`;
}

function getToneInstruction(tone: ToneMode): string {
    switch (tone) {
        case ToneMode.GENTLE:
            return "Tone: Gentle, encouraging, patient. Use positive reinforcement language ('You're close!', 'Good thought!').";
        case ToneMode.STRICT_MENTOR:
            return "Tone: Strict Mentor. Direct, challenging, high standards. Focus on precision and rigor. No fluff.";
        case ToneMode.EXAM_ORIENTED:
            return "Tone: Exam-Oriented. Formal, precise, focused on grading criteria, common pitfalls, and time management.";
        default:
            return "Tone: Balanced and educational.";
    }
}

function getSubjectInstruction(subject: SubjectDomain): string {
    switch (subject) {
        case SubjectDomain.CODING:
        case SubjectDomain.DATA_STRUCTURES:
        case SubjectDomain.ALGORITHMS:
            return "Domain: Computer Science / Engineering. Focus on logic, complexity, edge cases, and implementation details. Detect syntax errors vs logic errors.";
        case SubjectDomain.MATHEMATICS:
            return "Domain: Mathematics. Focus on calculation steps, theorem application, and logical derivation.";
        default:
            return "Domain: General Technical / Academic.";
    }
}
