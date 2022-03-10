const express =require('express');
const session=require('express-session');
const router = express.Router();
const connection = require('../database');

router.get('/login', function(request, response) {
	// Render login template
	response.render( 'login.ejs',{title: 'Login'});
});
router.get('/register', (req,res)=>{
    res.render('register',{title:'SignUp'});
})
router.get('/dashboard',(req,res)=>{
    res.render('index.html', {title: 'E-cademy'});
    })

router.get('/', (req,res)=>{

    res.render('index.html', {title: 'E-cademy'});
});
router.get('/contact', (req,res)=>{

    res.render('contact.html', {title: 'Contact Page'});
});
router.get('/horarios', (req,res)=>{

    res.render('horarios.html', {title: 'Horarios'});
});


module.exports=router;
