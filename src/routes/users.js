const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/register', (req, res) => {
    res.render('register', { title: 'SignUp' });
})
router.get('/login', (req, res) => {
    res.render('login', { title: 'SignIn' });
})

router.post('/register', (req, res) => {

    // store all the user input data
    const userDetails = req.body;

    // insert user data into users table
    var sql = 'INSERT INTO UserAl SET ?';

    let username = req.body.username;
    let password = req.body.password;


    db.query("SELECT DNI FROM Alumno WHERE DNI != ?", [userDetails.DNI], function (err, result) {
        // Capture the input fields
        username = req.body.username;
        password = req.body.password;
        // Ensure the input fields exists and are not empty
        if (username && password) {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            db.query('INSERT INTO UsuarioAl SET NomUser = ? AND Passw = ?', [username, password], function (error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    // Authenticate the user
                    req.session.loggedin = true;
                    req.session.username = username;
                    // Redirect to home page
                    res.send('La cuenta ya existe');
                } else {
                    res.render('student/student');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });


   // res.send("HOLA MUNDO")
});



router.post('/auth', (req, res) => {

    // store all the user input data
    const userDetails = req.body;




        // Capture the input fields
        let username = req.body.username;
        let password = req.body.password;
        // Ensure the input fields exists and are not empty
        if (username && password) {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            db.query('SELECT * FROM UsuarioAl WHERE NomUser = ? AND Passw = ?', [username, password], function (error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    // Authenticate the user
                    
                    // Redirect to home page
                    res.render('student/student');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    


   // res.send("HOLA MUNDO")
});

module.exports = router;
