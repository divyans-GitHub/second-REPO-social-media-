
const User = require('../models/users');

module.exports.profile = function(req , res){
     //res.end('<h1> WELCOME TO USERS PROFILE </h1>');
     return res.render('user_profile',{
        title: "PROFILE"
     });
}
// Here profile is called as action

// actions for sign - in
module.exports.signIn = function(req , res){
   return res.render('sign_in' , {
       title: "SIGN IN"
   });
    res.end("DO SSIGN IN TO ACCESS YOUR DATA");
}

// actions for sign-up
module.exports.signUp = function(req , res){
    return res.render('sign_up' , {
        title: "SIGN UP"
    });
     res.end("DO SSIGN IN TO ACCESS YOUR DATA");
 }
 
// get the sign up data
module.exports.create = function( req , res ){
 if(req.body.password != req.body.confirm_password){
     return res.redirect('back');
 }

 User.findOne({email: req.body.email} , function(err , user ){
     if(err){
         console.log("error! in finding user by email in siging up: " , err);
         return;
        }
     if(!user){
         User.create(req.body , function(err , user){
            if(err){
                console.log("error! in creating new user in DB while sign up: " , err);
                return;
            }
            return res.redirect('/users/sign-in');
         })
     }else return res.redirect('back');
 });
    
}

// validate sigin data and sign in and create session for the user
module.exports.createSession = function( req , res ){
  // steps to mannual authentication
  // find user by email
  User.findOne({email: req.body.email} , function(err , user){
    if(err){
        console.log("error! in finding user by email in siging in: " , err);
        return;
    }
    if(user){
        // handle if user found
        if(user.password == req.body.password){
            // handle when password match and create session
            res.cookie('user__id' , user._id);
            return res.redirect('/users/profile');
        }     
       // handle if password mismatch
       return res.redirect('back');

    }else{
      // if user's email not found
      return res.redirect('back');
    }
  });

}