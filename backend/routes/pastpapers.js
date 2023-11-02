const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PastPapers = require('../models/PastPapers');

const multer  = require('multer')

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } 
});

// #### Add Past Papers route #####
router.post('/addpastpapers', 
upload.array('p_image'),
[
  body('course_name').notEmpty().withMessage('Course name is required.'),
  body('university_name').notEmpty().withMessage('University name is required.'),
  body('p_image').notEmpty().withMessage('Image is required.'),
  body('p_type').notEmpty().withMessage('Type is required.'),
  body('year').notEmpty().withMessage('Year is required.'),
],
async (req, res) => {
  try {
  
    const course_name = req.body.course_name;
    const university_name = req.body.university_name;
    const p_image = req.files.map(file => file.path);
    const p_type = req.body.p_type;
    const year = req.body.year;
    const createNewPastPaper = new PastPapers({
      course_name,
      university_name,
      p_image,
      p_type,
      year
    });

  
    await createNewPastPaper.save();

    res.status(201).json({ success: true, message: 'Past Papers created successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);

    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

// #### Update Past Papers route #####
router.put('/updatepastpaper/:id', upload.array('p_image'), async (req, res) => {
  try {
    const { id } = req.params;
    const course_name = req.body.course_name;
    const university_name = req.body.university_name;
    var p_image = req.files.map(file => file.path);
    const p_type = req.body.p_type;
    const year = req.body.year;
      // If no new images were selected, keep the existing images unchanged
      if (p_image.length === 0) {
        const existingPaper = await PastPapers.findById(id);
        p_image = existingPaper.p_image;
      }
  
    const updatedData = {
      course_name,
      university_name,
      p_image,
      p_type,
      year
    };
  
    // Find the past paper by ID and update its data
    await PastPapers.findByIdAndUpdate(id, { $set: updatedData });
  
    res.status(200).json({ success: true, message: 'Past Paper updated successfully.' });
  } catch (error) {
    console.error('Error updating past paper:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the past paper.' });
  }
});

  
  // #### Delete Past Papers route #####
  router.delete('/deletepastpaper/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the past paper by ID and delete it
      await PastPapers.findByIdAndDelete(id);
  
      res.status(200).json({ success: true, message: 'Past Paper deleted successfully.' });
    } catch (error) {
      console.error('Error deleting past paper:', error);
      res.status(500).json({ success: false, message: 'An error occurred while deleting the past paper.' });
    }
  });
  
  // ### Get Past Papers route #####
  router.get('/getpastpapers', async (req, res) => {
  
    try {
      const pastpapers = await PastPapers.find();
      res.status(200).json({ success: true, pastpapers });
    } catch (error) {
      console.error('Error retrieving pastpapers:', error);
      res.status(500).json({ success: false, message: 'An error occurred while retrieving pastpapers.' });
    }
  });
  // ### Get Past Papers Count #####
  router.get('/getpastpapercount', async (req, res) => {
    try {
      const pastpapersCount = await PastPapers.countDocuments({});
      res.status(200).json({ success: true, pastpapersCount });
    } catch (error) {
      console.error('Error retrieving pastpapers count:', error);
      res.status(500).json({ success: false, message: 'An error occurred while retrieving pastpapers count.' });
    }
  });
  

  module.exports=router;