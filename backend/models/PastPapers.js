const mongoose = require('mongoose');
const pastpapersSchema = new mongoose.Schema({
    course_name: { type: String, required: true, min: 3, max: 255 },
    university_name: { type: String, required: true, min: 3, max: 255 },
    p_image: [{ type: String, required: true}],
    p_type: { type: String, required: true, min: 3, max: 255 },
    year : { type: Date, required:true },
});

module.exports = mongoose.model('PastPapers', pastpapersSchema);