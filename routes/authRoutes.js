const express = require('express');
const router = express.Router(); // Corrected from express.router() to express.Router()

const { register, login } = require('../controllers/authController');

// Registration and login routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
