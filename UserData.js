const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    domain: String,
    timeSpent: Number,
}, { timestamps: true });

module.exports = mongoose.model('UserData', UserDataSchema);
