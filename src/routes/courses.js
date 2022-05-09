const express = require('express');
const router = express.Router();
const pool = require('../database')
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');
const { isNotAdmin } = require('../lib/auth');

const helpers = require('../lib/helpers');
const path = require('path');

router.get('/file/:id',isLoggedIn,isNotAdmin, async(req, res) =>{
    const {id}=req.params;
    file=await pool.query('SELECT * FROM Files WHERE idFiles = ?',[id])
    fich=path.join(file[0].uploadPath)
    res.sendFile(fich);
  });
router.get('/:id', isLoggedIn, async (req, res) => {
    
    const idUser=req.user.idusers
    const Usuario =await pool.query('SELECT * FROM users WHERE idusers=?',[idUser])
    const { id } = req.params;
    const Asignatura = await pool.query('SELECT * FROM Asignatura WHERE idAsignatura = ?', [id])
    const Files = await pool.query('SELECT * FROM Files WHERE idAsignatura = ?',[id])

    if (await helpers.isNotAdmin(req.user.id_rol)) {//Profesor
        Asignatura[0].Rol=Usuario[0].id_rol
        Asignatura[0].Files=Files

        res.render('courses/asignatura', { title: Asignatura[0].Nombre, Asignatura: Asignatura});
    }else if(await helpers.isAdmin(req.user.id_rol)){
        return res.redirect('/administration');

    }
});





module.exports = router;