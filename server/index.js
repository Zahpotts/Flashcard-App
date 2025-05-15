import express from 'express';
import cors from 'cors';
import flashcardsRouter from './routes/flashcards.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/flashcards', flashcardsRouter);

app.get('/', (req, res) => { res.send('Server is running') });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});