const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup.hbs',{title:'Sign Up'})
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/courses',
    failureRedirect: '/signup',
    failureflash: true

}));
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin.hbs',{title:'Log In'})
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/courses',
        failureRedirect: '/signin',
        failureflash: true

    })(req, res, next)
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});
module.exports = router