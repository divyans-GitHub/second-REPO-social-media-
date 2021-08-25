const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = 80;

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

// middleware for reading form data
app.use(express.urlencoded());
//tell app to use cookie
app.use(cookieParser());

// extract styles and scripts from individual file into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



// for using static files
app.use(express.static('./assets'));

// setting up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');


// mongo store is used to store session cookie in the DB
//MIDDLE WARE TO ENCRYPTS
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
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
            console.log(err || 'connect-mongo setup is done !');
            return;
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/' , require('./routes'));  
// or app.use('/' , require('./routes/index.js));


app.listen(port , function(err){
    if(err) console.log(`Error in running server: ${err}`);

    console.log(`express erver is up and running on the port : ${port}`);
});