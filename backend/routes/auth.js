const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//####### Signup route #######
router.post('/signup',
[
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Invalid email address.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('country').notEmpty().withMessage('Country is required.'),
  body('city').notEmpty().withMessage('City is required.'),
  body('university').notEmpty().withMessage('University is required.'),
  body('education').notEmpty().withMessage('Education is required.'),

],

 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { name, email, password,country,city,university ,education  } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
        country,
        city,
        university,
        education
    });


    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'An error occurred during signup.' });
  }
});

// ##### Login route  #####
router.post('/login', 
[
  body('email').isEmail().withMessage('Invalid email address.'),
  body('password').notEmpty().withMessage('Password is required.'),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Create a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token,role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }
});


module.exports = router;