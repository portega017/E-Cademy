const express = require('express');
const app = express(); //servidor
const path = require('path');
const mysql = require('mysql');
const fileupload = require('express-fileupload');
const session = require('express-session'); //para almacenar una sesion
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

var adminRouter = require('./routes/admin');
var profRouter = require('./routes/profesor');
var userRouter=require('./routes/users');




//config
app.set('port', 3000);
app.engine('html', require('ejs').renderFile);
app.engine('xhtml', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(fileupload());
/*app.use( session( {
    //Aquí irían los atributos de nuestra sesión, como claves,
     //cómo se guarda, tiempo de expiración, etc...
     
  }));*/
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); //este método lo que nos permite es poder recibir los datos desde el cliente //con exteded: false indica que solo datos

//listen port
app.listen(app.get('port'), '0.0.0.0', () => { //pongo el 0.0.0.0 par apoder ponerlo en otro pc de la red, pero no hace falta
  console.log("Server on port ", app.get('port'));
});





//routes
app.use(require("./routes/index"));
app.use('/administration', adminRouter);
app.use('/teacher', profRouter);

app.use('/users',userRouter);

//require("./routes/admin")(app);



//static files
app.use(express.static(path.join(__dirname, 'public')))
