// no need to use async await
const User = require('../models/users');

module.exports.profile = function(req , res){
     //res.end('<h1> WELCOME TO USERS PROFILE </h1>');
     User.findById(req.params.id , function(err , user){
           
        return res.render('user_profile',{
            title: "PROFILE",
            profile_user: user // send each profile user when routes is invoked under friends section of home.ejs
            // here we can't use user as key instead of profile_user as it is there in locals
         });

     });
    
}
// Here profile is called as action


//action for updating user's profile
module.exports.update = function(req , res){
    if(req.user.id == req.params.id ){

        User.findByIdAndUpdate(req.params.id , req.body , function(err , updatedUser){
            return res.redirect('back');
        });
    }else{
        //sending http status code
        return res.status(401).send("Unautherised user");
    }
}



// actions for sign - in
module.exports.signIn = function(req , res){
   if(req.isAuthenticated() ){
       return res.redirect('/users/profile');
   }
   
    return res.render('sign_in' , {
       title: "SIGN IN"
   });
    res.end("DO SSIGN IN TO ACCESS YOUR DATA");
}

// actions for sign-up
module.exports.signUp = function(req , res){
    if(req.isAuthenticated() ){
        return res.redirect('/users/profile');
    }
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
                console.log("error! in creating new user in DB: " , err);
                return;
            }
            return res.redirect('/users/sign-in');
         })
     }else return res.redirect('back');
 });
    
}

// validate sigin data and sign in and create session for the user
module.exports.createSession = function( req , res ){
  // when you check out back to master this code remove
  return res.redirect('/');
}

module.exports.destroySession = function(req , res){
    req.logout();
    return res.redirect('/');
}








