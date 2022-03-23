const express = require('express');
const router = express.Router();
const pool = require('../database');

/* GET users listing. */

router.get('/', (req, res) => {

  res.render('admin/admin.hbs', { title: 'Administración' });
});




router.get('/registerTime', (req, res, next) => {
  res.render('admin/altaHorario.hbs', { title: 'Nuevo Horario' });
});


//ALUMNOS
router.get('/registerStudent', async (req, res, next) => {
  res.render('admin/altaAlumno.hbs', { title: 'Nuevo Alumno' });
});


router.get('/students', async (req, res, next) => {
  const Alumno = await pool.query('SELECT * FROM Alumno');

  res.render('admin/showAlumnos.hbs', { title: 'Alumnos', Alumno: Alumno });

});

router.post('/addAlumno', async (req, res) => { //async es necesario para el await
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

router.get('/deleteAlumno/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Alumno WHERE idAlumno = ?', [id]);
  req.flash('success', 'Alumno eliminado correctamente');

  res.redirect('/administration/students');

});


router.get('/editAlumno/:id', async (req, res) => {
  const { id } = req.params;
  const Alumno = await pool.query('SELECT * FROM Alumno WHERE idAlumno = ?', [id]);
  res.render('admin/editAlumno', { Alumno: Alumno[0] })

});

router.post('/editAlumno/:id', async (req, res) => {
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
router.get('/registerTeacher', async (req, res, next) => {
  res.render('admin/altaProfesor.hbs', { title: 'Nuevo Profesor' });
});

router.get('/teachers', async (req, res, next) => {
  const Profesor = await pool.query('SELECT * FROM Profesor');

  res.render('admin/showProfesores.hbs', { title: 'Profesores', Profesor: Profesor });

});

router.get('/deleteProfesor/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Profesor WHERE idProfesor = ?', [id]);
  req.flash('success', 'Profesor eliminado correctamente');

  res.redirect('/administration/teachers');

})


router.post('/addProfesor', async (req, res) => { //async es necesario para el await
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



router.get('/editProfesor/:id', async (req, res) => {
  const { id } = req.params;
  const Profesor = await pool.query('SELECT * FROM Profesor WHERE idProfesor = ?', [id]);
  res.render('admin/editProfesor', { Profesor: Profesor[0] })

});

router.post('/editProfesor/:id', async (req, res) => {
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


module.exports = router;