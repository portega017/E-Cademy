const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { isAdmin } = require('../lib/auth');


/* GET users listing. */

router.get('/', isLoggedIn, isAdmin, (req, res) => {

  res.render('admin/admin.hbs', { title: 'Administración' });
});




router.get('/registerTime', isLoggedIn, isAdmin, (req, res, next) => {
  res.render('admin/altaHorario.hbs', { title: 'Nuevo Horario' });
});


//ALUMNOS
router.get('/registerStudent', isLoggedIn, isAdmin, async (req, res, next) => {
  res.render('admin/altaAlumno.hbs', { title: 'Nuevo Alumno' });
});


router.get('/students', isLoggedIn, isAdmin, async (req, res, next) => {
  const Alumno = await pool.query('SELECT * FROM Alumno');

  res.render('admin/showAlumnos.hbs', { title: 'Alumnos', Alumno: Alumno });

});

router.post('/addAlumno', isLoggedIn, isAdmin, async (req, res) => { //async es necesario para el await
  const { Nombre, Apellidos, DNI, Direccion, Telefono, Correo } = req.body;
  const newStudent = {
    Nombre,
    Apellidos,
    DNI,
    Direccion,
    Telefono,
    Correo
  };
  const Alumno = await pool.query('SELECT * FROM Alumno WHERE DNI = ?', [newStudent.DNI]);
  console.log(Alumno.length)
  if (Alumno.length == 0) {
    await pool.query('INSERT INTO Alumno SET ?', [newStudent]);//await= me tomo mi tiempo y luego continuo con la ejecución
    req.flash('success', 'Alumno registrado correctamente.');
  } else {
    req.flash('success', 'El alumno ya existe.');
  }
  res.redirect("/administration/students");
});

router.get('/deleteAlumno/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const alumno = await pool.query('SELECT * FROM Alumno WHERE idAlumno = ?', [id]);
  if (alumno.length > 0) {
    await pool.query('DELETE FROM users WHERE DNI = ?', [alumno[0].DNI]);
  }
  await pool.query('DELETE FROM Alumno WHERE idAlumno = ?', [id]);
  req.flash('success', 'Alumno eliminado correctamente');

  res.redirect('/administration/students');

});


router.get('/editAlumno/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const Alumno = await pool.query('SELECT * FROM Alumno WHERE idAlumno = ?', [id]);
  res.render('admin/editAlumno', { Alumno: Alumno[0] })

});

router.post('/editAlumno/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellidos, DNI, Direccion, Telefono, Correo } = req.body;
  const newAlumno = {
    Nombre,
    Apellidos,
    DNI,
    Direccion,
    Telefono,
    Correo
  };
  await pool.query('UPDATE Alumno SET ? WHERE idAlumno = ?', [newAlumno, id]);
  req.flash('success', 'Alumno editado correctamente');

  res.redirect('/administration/students')
});








//Profesores
router.get('/registerTeacher', isLoggedIn, isAdmin, async (req, res, next) => {
  res.render('admin/altaProfesor.hbs', { title: 'Nuevo Profesor' });
});

router.get('/teachers', isLoggedIn, isAdmin, async (req, res, next) => {
  const Profesor = await pool.query('SELECT * FROM Profesor');

  res.render('admin/showProfesores.hbs', { title: 'Profesores', Profesor: Profesor });

});

router.get('/deleteProfesor/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const profesor = await pool.query('SELECT * FROM Profesor WHERE idProfesor = ?', [id]);
  if (profesor.length > 0) {
    await pool.query('DELETE FROM users WHERE DNI = ?', [profesor[0].DNI]);
  }
  await pool.query('DELETE FROM Profesor WHERE idProfesor = ?', [id]);
  req.flash('success', 'Profesor eliminado correctamente');

  res.redirect('/administration/teachers');

})


router.post('/addProfesor', isLoggedIn, isAdmin, async (req, res) => { //async es necesario para el await
  const { Nombre, Apellidos, DNI, Dirección, Telefono, Email } = req.body;
  const newTeacher = {
    Nombre,
    Apellidos,
    DNI,
    Dirección,
    Telefono,
    Email
  };
  const Teacher = await pool.query('SELECT * FROM Profesor WHERE DNI = ?', [newTeacher.DNI]);
  console.log(Teacher.length)
  if (Teacher.length == 0) {
    await pool.query('INSERT INTO Profesor SET ?', [newTeacher]);//await= me tomo mi tiempo y luego continuo con la ejecución
    req.flash('success', 'Profesor registrado correctamente.');
  } else {
    req.flash('success', 'El profesor ya existe.');
  }
  res.redirect("/administration/teachers");
});



router.get('/editProfesor/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const Profesor = await pool.query('SELECT * FROM Profesor WHERE idProfesor = ?', [id]);
  res.render('admin/editProfesor', { Profesor: Profesor[0] })

});

router.post('/editProfesor/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellidos, DNI, Dirección, Telefono, Email } = req.body;
  const newProfesor = {
    Nombre,
    Apellidos,
    DNI,
    Dirección,
    Telefono,
    Email
  };
  await pool.query('UPDATE Profesor SET ? WHERE idProfesor = ?', [newProfesor, id]);
  req.flash('success', 'Profesor editado correctamente');

  res.redirect('/administration/teachers')
});




//ASIGNATURAS

router.get('/altacurso', isLoggedIn, isAdmin, async (req, res) => {
  const profesores = await pool.query('SELECT * FROM Profesor');

  res.render('admin/altaCurso.hbs', { title: 'Administración', profesores: profesores });

});

router.post('/altacurso', isLoggedIn, isAdmin, async (req, res) => {
  const { Nombre, Codigo, idProfesor } = req.body;
  const asignatura = {
    Nombre,
    Codigo,
    idProfesor
  };
  const Asignatura = await pool.query('SELECT * FROM Asignatura WHERE Codigo = ?', [asignatura.Codigo]);
  const profesor = await pool.query('SELECT * FROM Profesor WHERE idProfesor = ?', [asignatura.idProfesor]);
  asignatura.Profesor = profesor[0].Nombre +' '+profesor[0].Apellidos;
  if (Asignatura.length == 0) {
    await pool.query('INSERT INTO Asignatura SET ?', [asignatura]);//await= me tomo mi tiempo y luego continuo con la ejecución
    req.flash('success', 'Curso registrado correctamente.');
  } else {
    req.flash('message', 'El curso ya existe.');
  }
  res.redirect("/administration/asignaturas");
});

router.get('/asignaturas', isLoggedIn, isAdmin, async (req, res, next) => {
  const Asignatura = await pool.query('SELECT * FROM Asignatura');

  res.render('admin/showAsignaturas.hbs', { title: 'Asignaturas', Asignatura });

});

router.get('/deleteAsignatura/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Asignatura WHERE idAsignatura = ?', [id]);
  req.flash('success', 'Asignatura eliminada correctamente');

  res.redirect('/administration/asignaturas');

})

router.get('/editCurso/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const Asignatura = await pool.query('SELECT * FROM Asignatura WHERE idAsignatura = ?', [id]);
  const profesores = await pool.query('SELECT * FROM Profesor');

  res.render('admin/editCurso', { Asignatura: Asignatura[0],profesores })


});

router.post('/editCurso/:id', isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { Nombre, Codigo, idProfesor} = req.body;
  const newAsignatura = {
    Nombre,
    Codigo,
    idProfesor
  };

  const profesor = await pool.query('SELECT * FROM Profesor WHERE idProfesor = ?', [newAsignatura.idProfesor]);
  newAsignatura.Profesor = profesor[0].Nombre +' '+profesor[0].Apellidos;
  await pool.query('UPDATE Asignatura SET ? WHERE idAsignatura = ?', [newAsignatura, id]);
  req.flash('success', 'Asignatura editada correctamente');

  res.redirect('/administration/asignaturas')
});

module.exports = router;