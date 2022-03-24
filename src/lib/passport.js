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
    console.log(req.body)//3:07:06
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        console.log(user.password)
        if (validPassword) {
            done(null, user, req.flash('success','Bienvenido ' + user.username));

        } else {
            done(null, false, req.flash('message',"Nombre de usuario y/o contraseña incorrecto"))
        }
    } else {
        return done(null, false, req.flash('message','Nombre de usuario y/o contraseña incorrecto'))
    }
}));




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
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;

    //para seguir adelante despues del signUp.
    return done(null, newUser);


}));

//para guardar el usuario en una sesion
passport.serializeUser((user, done) => {
    done(null, user.idusers);
});
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE idusers = ?', [id]);
    done(null, rows[0]);
});