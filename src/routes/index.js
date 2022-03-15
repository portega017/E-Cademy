const express = require('express');
const router = express.Router();




router.get('/', (req,res)=>{

    res.render('index.hbs', {title: 'E-cademy'});
});

router.get('/contact', (req,res)=>{

    res.render('contact.hbs', {title: 'Contact Page'});
});



router.get('/login', function(req, res) {
	// Render login template
	res.render( 'login.hbs',{title: 'Login'});
});
router.get('/register', (req,res)=>{
    res.render('register',{title:'SignUp'});
})
router.get('/dashboard',(req,res)=>{
    res.render('index.html', {title: 'E-cademy'});
    })



module.exports=router;