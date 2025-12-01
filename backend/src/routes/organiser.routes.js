const express = require('express');
const router = express.Router();
const { getDashboardStats, updateSignupStatus } = require('../controllers/organiser.controller');
const auth = require('../middleware/auth.middleware');

// All routes require authentication
router.get('/stats', auth, getDashboardStats);
router.patch('/signups/:id/status', auth, updateSignupStatus);

module.exports = router;
