const express = require('express');
const app = express();

const port = 80;

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

const db = require('./config/mongoose');

// extract styles and scripts from individual file into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

// use express router
app.use('/' , require('./routes/index.js'));  
// or app.use('/' , require('./routes));

// for using static files
app.use(express.static('./assets'));

// setting up view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port , function(err){
    if(err) console.log(`Error in running server: ${err}`);

    console.log(`express erver is up and running on the port : ${port}`);
});