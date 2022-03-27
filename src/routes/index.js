const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {

    res.render('index.hbs', { title: 'E-cademy' });
});

router.get('/contact', (req, res) => {

    res.render('contact.hbs', { title: 'Contact Page' });
});




router.get('/dashboard', (req, res) => {
    res.render('index.html', { title: 'E-cademy' });
})

router.get('/horario', (req, res, next) => {

    res.render('horario', { title: 'Alumnos' });

});

module.exports = router;