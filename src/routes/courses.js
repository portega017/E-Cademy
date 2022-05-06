const express = require('express');
const router = express.Router();
const pool = require('../database')
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const Asignatura = await pool.query('SELECT * FROM Asignatura WHERE idAsignatura = ?', [id])
    console.log(Asignatura)
    res.render('courses/asignatura', { title: Asignatura[0].Nombre, Asignatura: Asignatura });
});





module.exports = router;