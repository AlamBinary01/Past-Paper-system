const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ### Get Users Count #####
router.get('/getuserscount', async (req, res) => {
    try {
      const usersCount = await User.countDocuments({});
      res.status(200).json({ success: true, usersCount });
    } catch (error) {
      console.error('Error retrieving users count:', error);
      res.status(500).json({ success: false, message: 'An error occurred while retrieving users count.' });
    }
  });

  module.exports = router;