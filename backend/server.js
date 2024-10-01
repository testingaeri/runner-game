const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/runnerGame', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Score Model
const scoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
});
const Score = mongoose.model('Score', scoreSchema);

// Routes
app.post('/scores', async (req, res) => {
    const { username, score } = req.body;
    const newScore = new Score({ username, score });
    await newScore.save();
    res.status(201).send(newScore);
});

app.get('/scores', async (req, res) => {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
