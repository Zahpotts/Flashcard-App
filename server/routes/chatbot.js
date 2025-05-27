import express from 'express';
import googleGenAI from '../config/googleai';

const router = express.Router();

router.post('/chat ', async (req, res) => {
    try {
        const { message, history = [] } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        let contextPrompt = `You are a helpful assistant. You help students learn various topics by:
        1. Explaining concepts clearly and simply
        2. Providing examples and analogies
        3. Breaking down complex topics into manageable parts
        4. Suggesting study strategies and resources
        5. Creating practice questions or exercies when requested
        6. Being encourgaing and supportive
        
        Keep your responses educational, engaging, and appropritae for learning. If asked to generate study material, provide it in a clear and structured format.
        Current Conversation:`;
        // Add the history to the context prompt
        const recentHistory = history.slice(-10);
        recentHistory.forEach((item, index) => {
            contextPrompt += `\n${msg.role === `user` ? `Student ` : `Assistant`}: ${msg.content}`;
        });
        contextPrompt += `\nStudent: ${message}\nAssistant:`;
        try {
            const result = await googleGenAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: "user", parts: [{ text: contextPrompt }] }],
                genratationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.9,
                    maxOutputTokens: 1024,
                },
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
                console.error('No text content returned by the model');
                return res.status(500).json({ error: "No text content returned by the model" });
            }
            //Clean up the text
            const cleanedResponse = text.replace(/^Assistant: \s*/, '').trim();
            res.json({
                response: cleanedResponse,
                timeStamp: new Date().toISOString(),
        
            });
        } catch (error) {
            console.error('API call error', APIerror);
            res.status(500).json({ error: 'Error call google API', details: APIerror.message });
        }
    } catch (error) {
        console.error('Error in chat route:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }

});

export default router;
