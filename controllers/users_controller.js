// no need to use async await
const User = require('../models/users');
const fs = require('fs');
const path = require('path');


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
module.exports.update = async function(req , res){
    // if(req.user.id == req.params.id ){

    //     User.findByIdAndUpdate(req.params.id , req.body , function(err , updatedUser){
    //         return res.redirect('back');
    //     });
    // }else{
    //     //sending http status code
    //     return res.status(401).send("Unautherised user");
    // }

    if(req.user.id == req.params.id ){
       try{
          let user = await User.findById(req.params.id);
          User.uploadedAvatar( req , res , function(err){
          if(err){
            console.log("***multer Error***" , err);
            return;
          }
          
          user.name = req.body.name;
          user.email = req.body.email;
          //console.log("request file details: " , req.file );

          if(req.file){
            
            
            // //for deleting path we need fs module and path module 
            if(user.avatar){
                fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
               
            }
        //    fs.readdir(req.file.destination,function(err , file){
        //        if(err){console.log("error in finding files")}
        //        if(file || user.avatar){
        //         fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
        //        }
        //    } );

            //saving the path of upload file into the avatar feild in user schema
              user.avatar = User.avatarPath + '/' + req.file.filename;
            
            //console.log(User.avatarPath , "*********" , user.avatar);
            
          }
          user.save();
          return res.redirect('back');
        });

       }catch(err){
        req.flash('error' , err);
        return res.redirect('back');
       }
    }else{
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

  req.flash('success' , 'logged in successfully');
  return res.redirect('/');
}

module.exports.destroySession = function(req , res){
    req.logout();
    req.flash('success' , 'You have logged out');
    return res.redirect('/');
}








