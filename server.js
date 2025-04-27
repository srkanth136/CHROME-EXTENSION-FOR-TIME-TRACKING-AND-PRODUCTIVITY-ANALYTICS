const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserData = require('./models/UserData');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/time-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.post('/save', async (req, res) => {
    const { domain, timeSpent } = req.body;
    const data = new UserData({ domain, timeSpent });
    await data.save();
    res.send('Data saved!');
});

app.get('/analytics', async (req, res) => {
    const data = await UserData.find();
    res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
