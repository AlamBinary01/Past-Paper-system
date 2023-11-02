const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Courses = require('../models/Courses')


// ### Add Course route #####
router.post('/addcourse', 
[
  body('course_name').notEmpty().withMessage('Course name is required.'),
  body('course_code').notEmpty().withMessage('Course code is required.'),
  body('course_dept').notEmpty().withMessage('University name is required.'),
  body('year').notEmpty().withMessage('Year is required.'),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const courseData = req.body;

    // Check if course with the same coursecode already exists
    const existingCourse = await Courses.findOne({ coursea_code: courseData.course_code });
    if (existingCourse) {
      return res.status(409).json({ success: false, message: 'Course with the same course code already exists.' });
    }
    await Courses.insertMany(courseData);

    res.status(201).json({ success: true, message: 'Course added successfully.', });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ success: false, message: 'An error occurred while adding the course.' });
  }
});
// ### Get Count of Courses route #####
router.get('/getcoursescount', async (req, res) => {
    try {
      const coursesCount = await Courses.countDocuments();
      res.status(200).json({ success: true, coursesCount });
    } catch (error) {
      console.error('Error retrieving courses count:', error);
      res.status(500).json({ success: false, message: 'An error occurred while retrieving courses count.' });
    }
  });
  
  // ### Get Courses route #####
  router.get('/getcourses', async (req, res) => {
    try {
      const courses = await Courses.find();
      res.status(200).json({ success: true, courses });
    } catch (error) {
      console.error('Error retrieving courses:', error);
      res.status(500).json({ success: false, message: 'An error occurred while retrieving courses.' });
    }
  });

  module.exports= router;