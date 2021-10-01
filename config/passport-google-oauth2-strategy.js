const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/users');

passport.use(new googleStrategy({
        clientID: "387786437534-u5j7p8g9l946phdokg0i5jb89esiubps.apps.googleusercontent.com",
        clientSecret: "P525bSp7Px7pcdKX08LTc0HK",
        callbackURL: "http://localhost:80/users/auth/google/callback"
    },

    function(accessToken , refreshToken ,profile , done){
        User.findOne({email: profile.emails[0].value}).exec( function(err , user){
            if(err){
            console.log("error in using google-oauth-strategy" , err); 
            return;
            } 
            console.log(profile);

            if(user){
                //if user found in DB , set it as req.user
                return done(null , user);
            }
            else{
                //create user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },
                
                function(err , user){
                    if(err){
                        console.log('error in creating new user using google account' , err);
                        return;
                    }
                    return done(null , user );
                });
            }


        });
    }
));



module.exports = passport;
