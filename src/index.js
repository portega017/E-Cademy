const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const fileupload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const https = require("https");
const fs = require("fs");
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore=require('express-mysql-session')
const {database}=require('./keys');
const passport = require('passport');
//inicializaciones

const app = express();
require('./lib/passport');

var adminRouter = require('./routes/admin');
var profRouter = require('./routes/profesor');
var userRouter=require('./routes/users');
var courseRouter=require('./routes/courses');


//settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));


app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret:'ayaptj',
    resave:false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());
app.use(flash());

app.use(passport.initialize()); //para iniciar passport
app.use(passport.session());


//variables globales
app.use((req,res,next)=>{
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;

    next();
});
//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/administration', adminRouter);
app.use('/teacher', profRouter);
app.use(userRouter);
app.use('/courses',courseRouter);

//Public
app.use(express.static(path.join(__dirname,'public')))


//Starting the server
app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server on port ', app.get('port'))
});
