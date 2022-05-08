const express = require('express')
const router = express.Router();
const pool = require('../database')
const path = require('path');
const fs = require('fs');
const { isLoggedIn } = require('../lib/auth');
const { isTeacher } = require('../lib/auth');

//middlewares

//ROUTES
router.get('/', isLoggedIn, isTeacher, (req, res) => {

  res.render('admin/admin.hbs', { title: 'Administración' });
});

router.get('/fileUpload/:id', isTeacher, (req, res) => {
  const { id } = req.params;
  res.render('profesor/fileUpload.hbs', { title: 'Subir Apuntes', id });
});


router.get('/deleteFile/:id', isTeacher, async (req, res) => {
  const { id } = req.params;
  const File = await pool.query('SELECT * FROM Files WHERE idFiles=?', [id])
  fs.unlink(File[0].uploadPath, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
  });
  await pool.query('DELETE FROM Files WHERE idFiles=?', [id])
  res.redirect('/courses/' + File[0].idAsignatura);



})


router.post('/upload/:id', isTeacher,async (req, res) => {
  let file;
  let uploadPath;
  const { id } = req.params;
  const { Nombre } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  file = req.files.myFile;//myFile es el nombre que ponemos en el formulario en fileUpload.ejs
  uploadPath = path.join(__dirname, '../public/files/documentos/') + file.name;
  const Asignatura = await pool.query('SELECT * FROM Asignatura WHERE idAsignatura =?', [id])
  idAsignatura = Asignatura[0].idAsignatura
  const newFile = {
    idAsignatura,
    uploadPath,
    Nombre
  }
  await pool.query('INSERT INTO Files SET ?', [newFile])

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send(file.ext);

  });

  res.redirect('/courses/' + id);
});


router.get('/editFile/:id', isLoggedIn, isTeacher, async (req, res) => {
  const { id } = req.params;
  const File = await pool.query('SELECT * FROM Files WHERE idFiles = ?', [id]);

  res.render('profesor/editFile.hbs', { title: 'Editar Fichero', File: File[0] })


});



router.post('/edit/:id',isTeacher, async (req, res) => {
  let file;
  let uploadPath;
  const { id } = req.params;
  const { Nombre } = req.body;
  console.log(id)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  file = req.files.myFile;//myFile es el nombre que ponemos en el formulario en fileUpload.ejs
  uploadPath = path.join(__dirname, '../public/files/documentos/') + file.name;
  const File=await pool.query('SELECT * FROM Files WHERE idFiles=?',[id])
  fs.unlink(File[0].uploadPath, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
  });
  idAsignatura=File[0].idAsignatura
  const newFile = {
    idAsignatura,
    uploadPath,
    Nombre
  }
  
  await pool.query('UPDATE Files SET ? WHERE idFiles = ?', [newFile, id]);


  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send(file.ext);

  });

  res.redirect('/courses/' + idAsignatura);
});
module.exports = router;
