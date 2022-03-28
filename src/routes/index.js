const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {

    res.render('index.hbs', { title: 'E-cademy' });
});

router.get('/contact', (req, res) => {

    res.render('contact.hbs', { title: 'Contact Page' });
});





router.get('/horario', (req, res, next) => {

    res.render('horario', { title: 'Horarios' });

});

module.exports = router;