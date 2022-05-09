const express = require('express');
const router = express.Router();
const pool = require('../database')
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');
const helpers = require('../lib/helpers');


router.get('/profile.html', isLoggedIn, async (req, res) => {
    const id = req.user.idusers
    const Usuario = await pool.query('SELECT * FROM users WHERE idusers = ?', [id])

    res.render('user/myprofile', { title: 'Mi Perfil', user: Usuario[0] });
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const Usuario = await pool.query('SELECT * FROM users WHERE idusers = ?', [id])

    res.render('user/editProfile', { title: 'Editar Usuario', Usuario: Usuario[0] });
});

router.post('/updateProfile/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const { Username, NewUsername, NewPassword, Password } = req.body;
    const Usuario = await pool.query('SELECT * FROM users WHERE idusers = ?', [id])
    const validPassword = await helpers.matchPassword(Password, Usuario[0].password);
    if (Username != Usuario[0].username) { //error usuario incorrecto
        req.flash('message', 'El Nombre de Usuario actual no es correcto.');
        username = Username
        password = await helpers.encryptPassword(Password);
        res.redirect('/edit/' + id);

    } else if (!NewUsername && validPassword && NewPassword) {//cambio contraseña

        username = Username
        password = await helpers.encryptPassword(NewPassword);
        req.flash('success', 'Contraseña cambiada correctamente.');

        res.redirect('/profile.html')

    } else if (!validPassword) {//error contraseña incorrecta
        req.flash('message', 'La contraseña actual no es correcta.');
        username = Username
        password = await helpers.encryptPassword(Password);
        res.redirect('/edit/' + id);
    } else if (!NewPassword && NewUsername && validPassword) {//cambio Usuario
        username = NewUsername;
        password = await helpers.encryptPassword(Password);
        req.flash('success', 'Usuario cambiado correctamente.');

        res.redirect('/profile.html')

    } else {
        username = NewUsername
        password = NewPassword


        password = await helpers.encryptPassword(password);
        req.flash('success', 'Datos cambiados correctamente.');

        res.render('user/myprofile')



    }
    const newUser = {
        username,
        password
    }

    await pool.query('UPDATE users SET ? WHERE idusers = ?', [newUser, id]);


});
router.get('/courses', isLoggedIn, async (req, res) => {
    if (req.user.id_rol == 1) {
        res.redirect('/administration')
    } else if (req.user.id_rol == 2) {
        const Profesor = await pool.query('SELECT * FROM Profesor WHERE DNI=?', [req.user.DNI]);
        const Asignatura = await pool.query('SELECT * FROM Asignatura WHERE idProfesor = ?', [Profesor[0].idProfesor]);

        res.render('user/courses', { title: 'Mis Cursos', Asignatura: Asignatura });
    } else if (req.user.id_rol == 3) {
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
