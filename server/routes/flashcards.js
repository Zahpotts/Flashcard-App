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
    if(!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Flashcards not found for this topic' });
    }
    const flashcards = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({topic, flashcards});

});

router.post('/generate', async (req, res) => {
  try {
    const { topic, count = 5 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const prompt = `Generate ${count} flashcards for the topic "${topic}". Each flashcard should be a JSON object with a "question" and "answer". Respond with a JSON array only.`;

    const result = await googleGenAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;

    if (!response?.candidates?.length) {
      return res.status(500).json({ error: "No candidates returned by the model" });
    }

    const text = response.candidates[0].content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: "AI response missing text content" });
    }

    let flashcards;
    try {
      flashcards = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ error: "Failed to parse AI response as JSON", raw: text });
    }

    res.json({ topic, flashcards });

  } catch (error) {
    console.error("Error generating flashcards:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;