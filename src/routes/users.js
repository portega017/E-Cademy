const express = require('express');
const router = express.Router();
const pool = require('../database')
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/profile.html', isLoggedIn, (req, res) => {
    res.render('user/myprofile');
});

router.get('/edit', isLoggedIn, (req, res) => {
    res.render('user/editProfile');
});
router.get('/courses', isLoggedIn, (req, res) => {
    if (req.user.id_rol == 1) {
        res.redirect('/administration')
    } else {
        res.render('user/courses');
    }
});



module.exports = router;
