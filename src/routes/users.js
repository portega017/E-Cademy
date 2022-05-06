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
router.get('/courses', isLoggedIn, async (req, res) => {
    if (req.user.id_rol == 1) {
        res.redirect('/administration')
    } else {
        const Alumno = await pool.query('SELECT * FROM Alumno WHERE DNI=?', [req.user.DNI]);
        const profesor = await pool.query('SELECT * FROM Profesor')
        const Asignatura = await pool.query('SELECT * FROM Asignatura');
        const Rel = await pool.query('SELECT * FROM RelAsAl');
        var i = 0
        const asig = []
        while (i < Alumno.length) {
            for (var j = 0; j < Rel.length; j++) {
                for (var k = 0; k < Asignatura.length; k++) {
                    if (Alumno[i].idAlumno == Rel[j].idAlumno) {
                        if (Asignatura[k].idAsignatura == Rel[j].idAsignatura) {
                            for (var l = 0; l < profesor.length; l++) {
                                if (Asignatura[k].idProfesor == profesor[l].idProfesor) {
                                    Asignatura[k].Profesor = profesor[l].Nombre + ' ' + profesor[l].Apellidos;
                                }
                            }
                            asig.push(Asignatura[k])
                        }
                        Alumno[i].Asignaturas = asig
                    }
                }
            }
            i++
        }
        res.render('user/courses', { title: 'Mis Cursos', Asignatura: asig });
    }
});



module.exports = router;
