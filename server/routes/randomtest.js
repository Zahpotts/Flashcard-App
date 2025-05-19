import express from 'express';
import fs from 'fs';
import path from 'path';
import googleGenAI from '../config/googleai.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/:topic', (req, res) => {
    const topic = req.params.topic.toLowerCase();
    const filePath = path.join(__dirname, `../data/${topic}.json`);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Flashcards not found for this topic' });
    }
    const flashcards = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ topic, flashcards });
});

router.post('/generate', async (req, res) => {
    try {
        const { topic, count = 5} = req.body;
        
        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }
        // Validate that googleGenAI is properly configured
        if (!googleGenAI || !googleGenAI.models) {
            console.error('Google AI API not properly configured - missing API key or configuration');
            return res.status(500).json({
                error: 'Google AI API not properly configured',
                details: 'Check your API key and environment variables'
            });
        }
        const prompt = `Generate ${count} a random test with 4 options for the topic "${topic}". Each question should be a JSON object with a "question" and "options". Return only a valid JSON array with no additional text.`;
        try {

            const result = await googleGenAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            });


            let candidates;
            if (result.response?.candidates) {
                candidates = result.response.candidates;
            } else if (result.candidates) {
                candidates = result.candidates;
            } else {
                console.error('Unexpected API response structure:', result);
                return res.status(500).json({
                    error: 'Unexpected API response structure',
                    details: 'Could not find candidates in response'
                });
            }

           

            if (!candidates.length) {
                console.error('No candidates returned by the model');
                return res.status(500).json({ error: "No candidates returned by the model" });
            }

            // Find the text content - handle both possible structures
            let text;
            if (candidates[0].content?.parts) {
                text = candidates[0].content.parts[0]?.text;
            } else if (candidates[0].text) {
                text = candidates[0].text;
            } else {
                console.error('Could not find text content in candidate:', candidates[0]);
                return res.status(500).json({ error: "Could not find text content in model response" });
            }



            if (!text) {
                console.error('AI response missing text content');
                return res.status(500).json({ error: "AI response missing text content" });
            }

            let randomTest = [];
            try {
                // Try to parse the model response, removing any markdown formatting

                // Remove markdown code blocks (```json and ```)
                const cleanedText = text.replace(/```json|```/g, '').trim();


                randomTest = JSON.parse(cleanedText);


                // Validate flashcards format
                if (!Array.isArray(randomTest)) {
                    console.error('Response is not an array, got:', typeof randomTest);
                    throw new Error('Response is not an array');
                }



                // Ensure each question has the right format
               randomTest.forEach((item, index) => {
                    if (typeof item !== 'object' || !item.question || !item.options) {
                        console.error(`Question ${index} is not in the expected format:`, item);
                        throw new Error(`Question ${index} is not in the expected format`);
                    }
                });

            } catch (err) {
                console.error("JSON parsing error:", err.message);
                console.error("Error parsing JSON. Raw text:", text);
                return res.status(500).json({
                    error: "Failed to parse AI response as JSON",
                    raw: text,
                    details: err.message
                });
            }


            res.json({ topic, randomTest });
        } catch (apiError) {
            console.error("API call error:", apiError);
            return res.status(500).json({
                error: "Error calling Google Gemini API",
                message: apiError.message
            });
        }
    } catch (error) {
        console.error("Error generating flashcards:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});


export default router;