const express = require('express');

var cors = require('cors');
const env = require('./config/environment');

const logger = require('morgan');

const app = express();

require('./config/view-helper')(app);

const cookieParser = require('cookie-parser');

const port = 4000;

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');
const multer  = require('multer')

//set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening to port 5000");

const path = require('path');

if(env.name == 'development'){
    app.use(sassMiddleware({
        //src: './assets/scss',
        src: path.join(__dirname , env.asset_path , 'scss'),
        dest: path.join(__dirname , env.asset_path , 'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}



// middleware for reading form data
app.use(express.urlencoded({extended: false}));
//tell app to use cookie
app.use(cookieParser());

// extract styles and scripts from individual file into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

app.use(cors());

// for using static files
app.use(express.static(__dirname + env.asset_path));

//make the path uploads available for browser
app.use('/uploads' , express.static(__dirname  + '/uploads'));

app.use(logger(env.morgan.mode , env.morgan.options ));

// setting up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');


// mongo store is used to store session cookie in the DB
//MIDDLE WARE TO ENCRYPTS
app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:  MongoStore.create(
        {
        // mongooseConnection: db,
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
        }, function(err){
            // call back function in case connectioin is not established
            console.log(err || 'connect-mongo setup is done !');
            return;
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/' , require('./routes'));  
// or app.use('/' , require('./routes/index.js));


app.listen(port , function(err){
    if(err) console.log(`Error in running server: ${err}`);

    console.log(`express erver is up and running on the port : ${port}`);
});