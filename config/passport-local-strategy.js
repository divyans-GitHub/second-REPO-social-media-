
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
  function(req , email , password , done ){
 // find the user and establish identity
    User.findOne({ email: email } , function(err , user){
         if(err){
            //console.log('Error in finding user --> passport');
            req.flash('error' , err);
            return done(err);
         }
         if(!user || user.password != password){
            //  console.log('Invalid Username/Password');
            req.flash('error' , "Invalid Username/Password");
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


//check if user is authenticated
passport.checkAuthentication = function(req , res , next ){
    //if user is signed in pass on the req to next(controller's action)
    if(req.isAuthenticated() ){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req ,res , next ){
    if(req.isAuthenticated() ){
        //req.user contains current signed in user from session cookie, 
        //we are just sending this to locals for views
        res.locals.user = req.user;
    }
    return next();
}





module.exports = passport;



