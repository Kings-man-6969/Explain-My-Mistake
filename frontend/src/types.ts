import { z } from 'zod';

export enum SubjectDomain {
    CODING = 'coding',
    DATA_STRUCTURES = 'dsa',
    ALGORITHMS = 'algorithms',
    MATHEMATICS = 'mathematics',
    THEORY = 'theory',
    MULTIPLE_CHOICE = 'mcq'
}

export enum ToneMode {
    GENTLE = 'gentle',
    EXAM_ORIENTED = 'exam-oriented',
    STRICT_MENTOR = 'strict-mentor'
}

export const StudentSubmissionSchema = z.object({
    id: z.string(),
    userId: z.string(),
    question: z.string(),
    attemptedAnswer: z.string(),
    subject: z.nativeEnum(SubjectDomain),
    submissionTime: z.date().or(z.string().transform(str => new Date(str))),
    tonePreference: z.nativeEnum(ToneMode),
    isDemoMode: z.boolean().optional(),
});
export type StudentSubmission = z.infer<typeof StudentSubmissionSchema>;

export const ErrorDiagnosisSchema = z.object({
    primaryError: z.string(),
    secondaryErrors: z.array(z.string()),
    errorCategory: z.string(),
    severity: z.string(),
});
export type ErrorDiagnosis = z.infer<typeof ErrorDiagnosisSchema>;

export const ConceptGapSchema = z.object({
    concept: z.string(),
    description: z.string(),
    importance: z.string(),
    prerequisites: z.array(z.string()),
    resources: z.array(z.string()),
});
export type ConceptGap = z.infer<typeof ConceptGapSchema>;

export const ReasoningGuidanceSchema = z.object({
    steps: z.array(z.string()),
    keyInsights: z.array(z.string()),
    commonPitfalls: z.array(z.string()),
    nextActions: z.array(z.string()),
});
export type ReasoningGuidance = z.infer<typeof ReasoningGuidanceSchema>;

export const PracticeQuestionSchema = z.object({
    question: z.string(),
    difficulty: z.number().min(1).max(5),
    targetConcepts: z.array(z.string()),
    hints: z.array(z.string()),
    timeEstimate: z.number(),
    isProofOfLearning: z.boolean(),
});
export type PracticeQuestion = z.infer<typeof PracticeQuestionSchema>;

export const LearningMetricsSchema = z.object({
    conceptResolvedAfterAttempts: z.record(z.string(), z.number()),
    mistakeRecurrenceRate: z.number(),
    improvementVelocity: z.number(),
    masteryIndicators: z.array(z.string()),
});
export type LearningMetrics = z.infer<typeof LearningMetricsSchema>;

export const FormattedResponseSchema = z.object({
    errorDiagnosis: z.string(),
    conceptExplanation: z.string(),
    reasoningGuidance: z.array(z.string()),
    proofOfLearning: z.string(),
    socraticQuestion: z.string(),
    answerSafeBadge: z.boolean(),
    encouragement: z.string(),
    learningMetrics: LearningMetricsSchema.optional(),
});
export type FormattedResponse = z.infer<typeof FormattedResponseSchema>;

export const MistakeFingerprintSchema = z.object({
    userId: z.string(),
    commonErrorTypes: z.array(z.string()),
    recurringConcepts: z.array(z.string()),
    improvementTrend: z.string(),
    visualTags: z.array(z.string()),
    strengthAreas: z.array(z.string()),
    learningMetrics: LearningMetricsSchema,
    lastUpdated: z.date().or(z.string().transform(str => new Date(str))),
});
export type MistakeFingerprint = z.infer<typeof MistakeFingerprintSchema>;
