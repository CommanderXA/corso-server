const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Home page
// @route   Get /
router.get('/', ensureAuth, (req, res) => {
    res.send('Welcome to the home page ' + req.user.firstName);
});

// @desc    Login page
// @route   Get /
router.get('/login', ensureGuest, (req, res) => {
    res.send('Login');
});

module.exports = router;