const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/users');

const env = require('./environment');
console.log(env.google_callbackURL);
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callbackURL
    },

    function(accessToken , refreshToken ,profile , done){
        User.findOne({email: profile.emails[0].value}).exec( function(err , user){
            if(err){
            console.log("error in using google-oauth-strategy" , err); 
            return;
            } 
            //console.log(profile);
            //console.log(accessToken , refreshToken);
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
