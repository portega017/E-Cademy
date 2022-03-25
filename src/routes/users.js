const express = require('express');
const router = express.Router();
const db = require('../database')
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/profile.html', isLoggedIn,(req,res)=>{
    res.render('user/myprofile');
})
module.exports = router;
