const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:topic', (req, res) => {
    const topic = req.params.topic.toLowerCase();
    const filePath = path.join(__dirname, `../data/${topic}.json`);
    if(!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Flashcards not found for this topic' });
    }
    const flashcards = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({topic, flashcards});

});

module.exports = router;