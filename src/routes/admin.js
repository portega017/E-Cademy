const express = require('express');
const router = express.Router();
const db = require('../database');

/* GET users listing. */

router.get('/', (req, res) => {

  res.render('admin/admin.hbs', { title: 'Administración' });
});




router.get('/registerTime', function (req, res, next) {
  res.render('admin/altaHorario.hbs', { title: 'Nuevo Horario' });
});


//ALUMNOS
router.get('/registerStudent', function (req, res, next) {
  res.render('admin/altaAlumno.hbs', { title: 'Nuevo Alumno' });
});


router.get('/students', (req, res, next) => {
  db.query('SELECT * FROM Alumno', (err, data, fields) => {
    if (err) throw err;
    res.render('admin/showAlumnos.ejs', { title: 'Alumnos', Alumnos: data });
  });
});

router.post('/addAlumno', function (req, res, next) {

  // store all the user input data
  const userDetails = req.body;

  // insert user data into users table
  var sql = 'INSERT INTO Alumno SET ?';




  db.query("SELECT DNI FROM Alumno WHERE DNI = ?", [userDetails.DNI], function (err, result) {
    if (err) {
      return res.status(500).send(err) // <-- add return
    } else {
      if (result.length === 0) {
        //new user logic
        db.query(sql, userDetails, function (err, data) {
          if (err) {
            return res.status(500).send(err) // <-- add return
          } else {
            console.log("Alumno grabado correctamente ");

            return res.render('admin/altaAlumno.hbs', { title: 'Nuevo Alumno' });  // redirect to user form page after inserting the data
            // <-- add return
          }
        });
      } else {
        //existing user, redirect to another page 
        res.redirect('/administration/students');

      }
    }
  });

});


router.get('/editarAlumno/:id', (req, res, next) => {

});

router.get('/edit/:id', function(req, res, next) {
  var idAlumno= req.params.id;
  var sql=`SELECT * FROM Alumno WHERE idAlumno=${idAlumno}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
   
    res.render('users-form', { title: 'User List', editData: data[0]});
  });
});

router.post('/edit/:id',(req,res,next)=>{
  const userDetails = req.body;

  // insert user data into users table
  var id = req.params.id;
  var sql = 'UPDATE Alumno SET = ? WHERE idAlumno = ?';
  db.query(sql, [userDetails,id], function (err, data) {
    if (err) {
      return res.status(500).send(err) // <-- add return
    } else {
      console.log("Alumno Modificado");
      return res.redirect('/administration/students');  // redirect to user form page after inserting the data
      // <-- add returnƒ
    }
  });
});

router.get('/removeAlumno/:id', (req, res, next) => {

  // store all the user input data
  const userDetails = req.body;

  // insert user data into users table
  var id = req.params.id;
  var sql = 'DELETE FROM Alumno WHERE idAlumno = ?';
  db.query(sql, [id], function (err, data) {
    if (err) {
      return res.status(500).send(err) // <-- add return
    } else {
      console.log("Alumno Eliminado");
      return res.redirect('/administration/students');  // redirect to user form page after inserting the data
      // <-- add returnƒ
    }
  });
});








//Profesores
router.get('/registerTeacher', function (req, res, next) {
  res.render('admin/altaProfesor.hbs', { title: 'Nuevo Profesor' });
});

router.get('/teachers', (req, res, next) => {
  db.query('SELECT * FROM Profesor', (err, data, fields) => {
    if (err) throw err;
    res.render('admin/showProfesores.ejs', { title: 'Profesores', Profesores: data });
  });
});

router.get('/removeProfesor/:id', (req, res, next) => {

  // store all the user input data
  const userDetails = req.body;

  // insert user data into users table
  var id = req.params.id;
  var sql = 'DELETE FROM Profesor WHERE idProfesor = ?';
  db.query(sql, [id], function (err, data) {
    if (err) {
      return res.status(500).send(err) // <-- add return
    } else {
      console.log("Profesor Eliminado");
      return res.redirect('/administration/teachers');  // redirect to user form page after inserting the data
      // <-- add returnƒ
    }
  });
});


router.post('/addProfesor', function (req, res, next) {

  // store all the user input data
  const userDetails = req.body;

  // insert user data into users table
  var sql = 'INSERT INTO Profesor SET ?';




  db.query("SELECT DNI FROM Profesor WHERE DNI = ?", [userDetails.DNI], function (err, result) {
    if (err) {
      return res.status(500).send(err) // <-- add return
    } else {
      if (result.length === 0) {
        //new user logic
        db.query(sql, userDetails, function (err, data) {
          if (err) {
            return res.status(500).send(err) // <-- add return
          } else {
            console.log("Profesor grabado correctamente ");

            return res.render('admin/altaProfesor.hbs', { title: 'Nuevo Profesor' });  // redirect to user form page after inserting the data
            // <-- add return
          }
        });
      } else {
        //existing user, redirect to another page 
        res.redirect('/administration/teachers');

      }
    }
  });

});
module.exports = router;