const express = require('express')
const router = express.Router();
const db = require('../database')
const db2 = require('../database2')
const path = require('path');
const fs = require('fs');


//middlewares

//ROUTES
router.get('/', (req, res) => {

  res.render('admin/admin.ejs', { title: 'Administración' });
});

router.get('/fileUpload', (req, res) => {

  res.render('profesor/fileUpload.ejs', { title: 'Subir Apuntes' });
});





router.post('/upload', function (req, res) {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  file = req.files.myFile;//myFile es el nombre que ponemos en el formulario en fileUpload.ejs
  uploadPath = path.join(__dirname, '../public/files/documentos/') + file.name;

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    console.log(file.mimetype);
    //res.send('File uploaded!');
    res.send(file.ext);
//    res.redirect('/teacher/fileUpload');

  });
});
module.exports = router;
