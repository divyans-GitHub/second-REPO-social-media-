const mongoose = require('mongoose');

//establishing connection :connect mongodb
mongoose.connect('mongodb://localhost/codeial_development' ,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error' , console.error.bind(console, 'Error in connecting to MongoDB'));
db.once('open' , function(){
    console.log('successfully connected to mongoDB');
});

module.exports = db;