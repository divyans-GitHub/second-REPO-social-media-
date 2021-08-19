module.exports.profile = function(req , res){
     //res.end('<h1> WELCOME TO USERS PROFILE </h1>');
     return res.render('user_profile',{
        title: "PROFILE"
     });
}
// Here profile is called as action