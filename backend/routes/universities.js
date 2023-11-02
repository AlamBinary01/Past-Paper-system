const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const University = require('../models/University');


// ##### Add university route  #####
router.post('/adduniversity', 
[
  body('university_name').notEmpty().withMessage('University name is required.'),
  body('country').notEmpty().withMessage('Country is required.'),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const universityData = req.body;

    // Check if university already exists
    const existUni = await University.findOne({ university_name: universityData.university_name });
    if (existUni) {
      return res.status(409).json({ message: 'University already exists.' });
    }
    await University.insertMany(universityData);

    res.status(201).json({ success: true, message: 'University created successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});
//### Get University route #####
router.get('/getuniversity', async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json({ success: true, universities });
  } catch (error) {
    console.error('Error retrieving university:', error);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving university.' });
  }
});

// ##### Get university count route  #####  
router.get('/getuniversityCount', async (req, res) => {
  try {
    const universityCount = await University.countDocuments({});
    res.status(201).json({ success: true, universityCount });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});
module.exports = router;