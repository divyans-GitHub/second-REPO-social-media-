module.exports.signIn = function(req , res){
   return res.render('sign_in' , {
       title: "SIGN IN"
   });
    res.end("DO SSIGN IN TO ACCESS YOUR DATA");
}

module.exports.signUp = function(req , res){
    return res.render('sign_up' , {
        title: "SIGN UP"
    });
     res.end("DO SSIGN IN TO ACCESS YOUR DATA");
 }
 