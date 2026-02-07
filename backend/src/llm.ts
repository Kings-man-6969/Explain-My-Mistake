import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from 'zod';
import { FormattedResponseSchema, StudentSubmission } from './types';
import { getSystemPrompt, getUserPrompt } from './prompts';
import dotenv from 'dotenv';

dotenv.config();

export const analyzeSubmission = async (submission: StudentSubmission, attempt: number = 0): Promise<z.infer<typeof FormattedResponseSchema>> => {
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
        if (submission.isDemoMode) {
            console.warn("Missing GEMINI_API_KEY. Using mock response for DEMO.");
            return getMockResponse();
        }
        throw new Error("GEMINI_API_KEY is missing. Please set GEMINI_API_KEY in .env");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: getSystemPrompt(submission)
    });

    const MAX_RETRIES = 1;

    try {
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: getUserPrompt(submission) }],
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
            }
        });

        const response = result.response;
        let content = response.text();

        if (!content) throw new Error("Empty response from AI");

        // cleaning json block just in case, though responseMimeType should handle it
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsed = JSON.parse(content);
        const validatedResult = FormattedResponseSchema.parse(parsed); // Validate with Zod
        return validatedResult;

    } catch (error) {
        console.error("LLM Analysis Error:", error);
        if (attempt < MAX_RETRIES) {
            console.log(`Retrying analysis (attempt ${attempt + 1})...`);
            return analyzeSubmission(submission, attempt + 1);
        }

        // If we fail after retries in demo mode, fallback to mock
        if (submission.isDemoMode) {
            return getMockResponse();
        }

        throw error;
    }
};

function getMockResponse(): z.infer<typeof FormattedResponseSchema> {
    return {
        errorDiagnosis: "DEMO MODE: API Key missing or Error. This is a simulated diagnosis. Your loop condition is incorrect.",
        conceptExplanation: "Off-by-one errors often occur when using <= instead of < in zero-indexed arrays.",
        reasoningGuidance: ["Check the array length.", "Trace the last iteration."],
        proofOfLearning: "Rewrite the loop for array of size 5.",
        socraticQuestion: "What is the index of the last element in an array of size N?",
        answerSafeBadge: true,
        encouragement: "You're getting there!",
        learningMetrics: {
            conceptResolvedAfterAttempts: {},
            mistakeRecurrenceRate: 0,
            improvementVelocity: 0,
            masteryIndicators: []
        }
    };
}
