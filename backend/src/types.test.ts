import { test, expect } from '@jest/globals';
import * as fc from 'fast-check';
import { FormattedResponseSchema } from './types';

test('Property 23: Pedagogically Sound Response Structure - Validates Requirements 8.3', () => {
    // Requirement 8.3: The System SHALL structure responses with clear sections for error diagnosis, concept explanation, and reasoning guidance
    // This is enforced by the Zod schema.

    fc.assert(
        fc.property(
            fc.record({
                errorDiagnosis: fc.string(),
                conceptExplanation: fc.string(),
                reasoningGuidance: fc.array(fc.string()),
                proofOfLearning: fc.string(),
                socraticQuestion: fc.string(),
                answerSafeBadge: fc.boolean(),
                encouragement: fc.string()
            }),
            (data) => {
                const result = FormattedResponseSchema.safeParse(data);
                return result.success;
            }
        )
    );
});
