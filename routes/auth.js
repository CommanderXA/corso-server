const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// @desc    Auth with Google
// @route   Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

// @desc    Google auth callback
// @route   Get /auth/google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login'}), (req, res) => {
    res.redirect('/')
});

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;