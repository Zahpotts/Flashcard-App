import express from 'express';
import cors from 'cors';
import flashcardsRouter from './routes/flashcards.js';
import randomtestRouter from './routes/randomtest.js';
import chatbotRouter from './routes/chatbot.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Specify your client's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/flashcards', flashcardsRouter);
app.use('/api/randomtest', randomtestRouter);
app.use('/api/chatbot', chatbotRouter);

app.get('/', (req, res) => { res.send('Server is running') });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});