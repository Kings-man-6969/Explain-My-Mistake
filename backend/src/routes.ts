import { Router } from 'express';
import { z } from 'zod';
import db from './db';
import { StudentSubmissionSchema } from './types';
import { v4 as uuidv4 } from 'uuid';
import { analyzeSubmission } from './llm';

const router = Router();

// Schema for submission request (without generated fields)
const SubmissionRequestSchema = StudentSubmissionSchema.omit({
    id: true,
    submissionTime: true
});


// ... imports

router.post('/submit', async (req, res) => {
    try {
        const body = SubmissionRequestSchema.parse(req.body);

        const submissionId = uuidv4();
        const submissionTime = new Date();

        // Ensure user exists (for demo purposes)
        db.prepare('INSERT OR IGNORE INTO users (id, created_at) VALUES (?, ?)').run(body.userId, new Date().toISOString());


        const stmt = db.prepare(`
      INSERT INTO submissions (id, user_id, question, attempted_answer, subject, submission_time, tone_preference, is_demo_mode) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(
            submissionId,
            body.userId,
            body.question,
            body.attemptedAnswer,
            body.subject,
            submissionTime.toISOString(),
            body.tonePreference,
            body.isDemoMode ? 1 : 0
        );

        // Analyze submission
        const analysisResult = await analyzeSubmission({
            ...body,
            id: submissionId,
            submissionTime,
        });

        // Save analysis result
        const updateStmt = db.prepare('UPDATE submissions SET analysis_result_json = ? WHERE id = ?');
        updateStmt.run(JSON.stringify(analysisResult), submissionId);

        res.json({ success: true, submissionId, result: analysisResult });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: (error as any).errors });
        } else {
            console.error(error);
            res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
        }
    }
});

router.get('/history/:userId', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM submissions WHERE user_id = ? ORDER BY submission_time DESC');
        const rows = stmt.all(req.params.userId);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
