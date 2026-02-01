# Requirements Document

## Introduction

Unlike traditional AI tutors that answer questions, Explain My Mistake is designed to analyze thinking errors and turn them into personalized learning moments. 

Explain My Mistake is an AI learning assistant designed first for CS & Engineering students learning problem-solving, with the ability to generalize to other domains. The system focuses on explaining the reasoning behind mistakes, identifying knowledge gaps, and guiding students toward correct thinking without directly providing final answers. This approach promotes deeper learning and helps students develop problem-solving skills by understanding how they think when they're wrong.

## Glossary

- **System**: The Explain My Mistake AI learning assistant
- **Student**: A user who submits questions and their attempted answers for analysis
- **Question**: The original problem, exercise, or query that the student is trying to solve
- **Attempted_Answer**: The student's submitted solution or response that contains errors or is incomplete
- **Error_Diagnosis**: The system's analysis of what went wrong in the student's reasoning
- **Concept_Gap**: Missing knowledge or understanding that led to the mistake
- **Corrected_Reasoning**: Step-by-step guidance on proper thinking without revealing the final answer
- **Proof_of_Learning**: A follow-up question designed to verify the student has internalized the corrected concept
- **Mistake_Fingerprint**: A personalized profile of a student's common error patterns, recurring concept gaps, and learning improvement trends
- **Answer_Safe_Mode**: A visible system constraint that ensures responses teach thinking without revealing final answers
- **Socratic_Question**: A reflective question posed at the end of each response to encourage deeper thinking
- **Tone_Mode**: The communication style used by the system (gentle, exam-oriented, strict mentor)
- **Subject_Domain**: The academic area (coding, math, theory, MCQ) of the question

## Requirements

### Requirement 1: Answer Analysis and Error Diagnosis

**User Story:** As a student, I want to submit my wrong answer and understand why it's incorrect, so that I can learn from my mistakes and improve my understanding.

#### Acceptance Criteria

1. WHEN a student submits a question and their attempted answer, THE System SHALL analyze the response and identify specific errors in reasoning
2. WHEN the analysis is complete, THE System SHALL provide a clear explanation of what went wrong without revealing the correct final answer
3. WHEN multiple errors exist in one answer, THE System SHALL prioritize and explain the most fundamental mistake first
4. WHEN the attempted answer is partially correct, THE System SHALL acknowledge correct portions while focusing on the erroneous parts
5. THE System SHALL support analysis across coding, mathematics, theoretical concepts, and multiple-choice questions

### Requirement 2: Concept Gap Identification

**User Story:** As a student, I want to understand what knowledge I'm missing, so that I can focus my learning on the right areas.

#### Acceptance Criteria

1. WHEN analyzing an incorrect answer, THE System SHALL identify the underlying concept or knowledge gap that led to the mistake
2. WHEN a concept gap is identified, THE System SHALL explain the missing concept in clear, accessible language
3. WHEN multiple concepts are involved, THE System SHALL distinguish between primary and secondary knowledge gaps
4. THE System SHALL connect the identified gap to the specific error in the student's reasoning
5. THE System SHALL provide context about why this concept is important for solving similar problems

### Requirement 3: Corrected Reasoning Guidance

**User Story:** As a student, I want step-by-step guidance on correct thinking, so that I can develop proper problem-solving approaches without being given the answer directly.

#### Acceptance Criteria

1. WHEN providing corrected reasoning, THE System SHALL guide the student through proper thinking steps without revealing the final answer
2. WHEN explaining the correct approach, THE System SHALL use the student's original work as a starting point for corrections
3. WHEN multiple solution paths exist, THE System SHALL focus on the most educational approach for the identified concept gap
4. THE System SHALL encourage the student to apply the corrected reasoning to reach their own conclusion
5. THE System SHALL avoid giving away key intermediate steps that would make the final answer obvious

### Requirement 4: Proof of Learning Questions

**User Story:** As a student, I want verification questions related to my mistake, so that I can confirm my understanding and prove I've internalized the corrected concept.

#### Acceptance Criteria

1. WHEN corrected reasoning is provided, THE System SHALL generate a relevant Proof_of_Learning question targeting the same concept
2. WHEN creating proof questions, THE System SHALL ensure they are similar in difficulty and concept but different in specific details
3. THE System SHALL provide proof questions that allow students to demonstrate they've applied the corrected reasoning
4. WHEN a student requests additional verification, THE System SHALL generate multiple variations of the concept
5. THE Proof_of_Learning SHALL be designed to reveal whether the student has truly internalized the corrected understanding

### Requirement 5: Multi-Subject Support

**User Story:** As a student studying various subjects, I want to use the same tool for different types of problems, so that I have a consistent learning experience across domains.

#### Acceptance Criteria

1. THE System SHALL support coding problems including algorithm design, data structures, and programming logic
2. THE System SHALL support mathematical problems including algebra, calculus, statistics, and discrete mathematics
3. THE System SHALL support theoretical concepts across computer science, engineering, and related technical fields
4. THE System SHALL support multiple-choice questions with analysis of why incorrect options were selected
5. WHEN switching between subjects, THE System SHALL adapt its explanation style to match domain-specific conventions

### Requirement 6: Tone and Communication Modes

**User Story:** As a student with specific learning preferences, I want to choose how the AI communicates with me, so that I receive feedback in a style that motivates and helps me learn effectively.

#### Acceptance Criteria

1. THE System SHALL provide a gentle tone mode that uses encouraging language and focuses on positive reinforcement
2. THE System SHALL provide an exam-oriented tone mode that mimics formal academic feedback and emphasizes precision
3. THE System SHALL provide a strict mentor tone mode that uses direct, challenging language to push for deeper understanding
4. WHEN a tone mode is selected, THE System SHALL maintain that communication style consistently throughout the interaction
5. THE System SHALL allow students to change tone modes between different questions or sessions

### Requirement 7: Mistake Fingerprint and Learning Patterns

**User Story:** As a student, I want to see my personalized mistake patterns and learning fingerprint, so that I can understand my thinking tendencies and focus on areas that need improvement.

#### Acceptance Criteria

1. WHEN a student submits answers, THE System SHALL store the question, attempted answer, and identified concept gaps in their learning history
2. WHEN analyzing mistake patterns, THE System SHALL generate a Mistake_Fingerprint showing common error types, recurring concept gaps, improvement trends, and measurable learning signals
3. WHEN displaying the Mistake_Fingerprint, THE System SHALL use visual elements like tags or charts to make patterns memorable and include metrics like "Concept resolved after N attempts" and "Mistake recurrence rate"
4. WHEN recurring concept gaps are detected, THE System SHALL highlight these areas as needing additional focus within the fingerprint
5. WHEN a student revisits a previously problematic concept, THE System SHALL reference their fingerprint to provide contextual encouragement and show progress

### Requirement 8: Answer-Safe Mode and Socratic Engagement

**User Story:** As a student, I want clear indication that the system won't give me answers directly and will instead guide my thinking, so that I can trust the learning process and engage more deeply.

#### Acceptance Criteria

1. THE System SHALL display a visible "Answer-Safe Mode: ON" indicator to reinforce that it teaches thinking, not answers
2. WHEN providing any response, THE System SHALL include exactly one Socratic question at the end to encourage reflection
3. WHEN generating Socratic questions, THE System SHALL make them specific to the student's error and the concept being taught
4. THE System SHALL ensure Socratic questions promote deeper understanding without revealing solution steps
5. THE System SHALL vary Socratic question types to maintain engagement and target different aspects of reasoning

### Requirement 9: Response Generation and Quality

**User Story:** As a student, I want clear, educational responses that help me learn effectively, so that I can understand complex concepts and improve my problem-solving skills.

#### Acceptance Criteria

1. THE System SHALL generate responses that are pedagogically sound and promote active learning
2. WHEN explaining concepts, THE System SHALL use examples and analogies appropriate to the student's apparent level
3. THE System SHALL structure responses with clear sections for error diagnosis, concept explanation, and reasoning guidance
4. THE System SHALL ensure responses are complete enough to be educational but concise enough to maintain engagement
5. WHEN technical jargon is necessary, THE System SHALL provide brief explanations or context for unfamiliar terms