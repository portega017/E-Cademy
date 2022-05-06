//definimos metodos de autenticacion

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    //3:07:06
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        await helpers.isAdmin(user.id_rol)
        const validPassword = await helpers.matchPassword(password, user.password);

        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));

        } else {
            done(null, false, req.flash('message', "Nombre de usuario y/o contraseña incorrecto"))
        }
    } else {
        return done(null, false, req.flash('message', 'Nombre de usuario y/o contraseña incorrecto'))
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//SIGNUP
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //para añadir mas campos que vienen en el reqbody
}, async (req, username, password, done) => {
    const { DNI } = req.body;//de req.body solo quiero el DNI
    const newUser = {
        username,
        password,
        DNI
    };
    //ciframos la contraseña
    newUser.password = await helpers.encryptPassword(password);
    const compruebaP = await pool.query('SELECT * FROM Profesor WHERE DNI = ?', [newUser.DNI]);
    const compruebaA = await pool.query('SELECT * FROM Alumno WHERE DNI = ?', [newUser.DNI]);
    const compruebaDNI = await pool.query('SELECT * FROM users WHERE DNI = ?', [newUser.DNI]);
    const compruebaUsuario = await pool.query('SELECT * FROM users WHERE username = ?', [newUser.username]);
    if (compruebaUsuario.length > 0) {
        return done(null, false, req.flash('message', 'Nombre de usuario existente, selecciona otro.'));
    } else if (compruebaDNI.length > 0) {
        return done(null, false, req.flash('message', 'El usuario ya está registrado'));
    } else if (compruebaP.length > 0) {
        newUser.id_rol = 2;
        newUser.fullname = compruebaP[0].Nombre;
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        newUser.id = result.insertId;
        //para seguir adelante despues del signUp.
        return done(null, newUser);

    } else if (compruebaA.length > 0) {
        newUser.id_rol = 3;
        newUser.fullname = compruebaA[0].Nombre;

        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        newUser.id = result.insertId;
        //para seguir adelante despues del signUp.
        return done(null, newUser);


    } else {
        return done(null, false, req.flash('message', 'El DNI no está dado de alta'))

    }





}));

//para guardar el usuario en una sesion
passport.serializeUser(async (user, done) => {
    done(null, user.idusers);
});
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE idusers = ?', [id]);
    done(null, rows[0]);
});