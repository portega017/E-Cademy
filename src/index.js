const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const fileupload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//inicializaciones

const app = express();
var adminRouter = require('./routes/admin');
var profRouter = require('./routes/profesor');
var userRouter=require('./routes/users');
//settings
app.set('port', process.env.PORT || 3000);
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
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());
//variables globales
app.use((req,res,next)=>{

    next();
});
//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/administration', adminRouter);
app.use('/teacher', profRouter);
app.use('/users',userRouter);

//Public
app.use(express.static(path.join(__dirname,'public')))


//Starting the server
app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server on port ', app.get('port'))
});