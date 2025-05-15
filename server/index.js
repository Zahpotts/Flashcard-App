const express = require('express');
const cors = require('cors');
const flashcardsRouter = require('./routes/flashcards');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/flashcards', flashcardsRouter);

app.get('/', (req, res) => { res.send('Server is running') });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});