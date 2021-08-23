
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email , password , done ){
 // find the user and establish identity
    User.findOne({ email: email } , function(err , user){
         if(err){
            console.log('Error in finding user --> passport');
            return done(err);
         }
         if(!user || user.password != password){
             console.log('Invalid Username/Password');
             return done(null , false);
         }
         return done(null , user);
    } );
  }

));

//serializing the user means to decide which key to be kept in cookies
passport.serializeUser( function(user , done ){
  done(null , user.id );
});

// deserializing the user from key in the cookie
passport.deserializeUser( function(id , done){
    User.findById(id , function(err ,user ){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null , user);

    });
});

module.exports = passport;



