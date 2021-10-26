const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

const env = require('./environment');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
    // we have used that key in users_api of controller , change there also
}

// this is after once the JWT is created
passport.use(new JWTStrategy( opts , function(jwtPayLoad , done){
    console.log(opts.secretOrKey , "**********");
   User.findById(jwtPayLoad._id , function(err , user ){
       if(err){
           console.log("user is not found"); return;
       }
        // once user found put it in to the request
       if(user){
           return done(null , user);
       }else return done(null , false);
   });

}));



module.exports = passport;

