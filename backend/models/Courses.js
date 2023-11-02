const mongoose = require('mongoose');
const coursesSchema = new mongoose.Schema({
    course_name: { type: String, required: true, min: 3, max: 255 },
    course_code: { type: String, required: true, min: 3, max: 255 },
    course_dept: { type: String, required: false, min: 3, max: 255 },
    year : { type: Date, required:true },
});

module.exports = mongoose.model('Courses', coursesSchema);

