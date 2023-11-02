const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 255 },
    email: { type: String, required: true, max: 255, min: 6 },
    password: { type: String, required: true, min: 6, max: 1024 },
    country: { type: String, required: true, min: 3, max: 255 },
    city: { type: String, required: true, min: 3, max: 255 },
    university: { type: String, required: true, min: 3, max: 255 },
    education: { type: String, required: true, min: 3, max: 255 },
    role : { type: String, enum: ['user', 'admin'], default: 'user' },
    date : { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
