module.exports.home = function(req , res ){
   console.log(req.cookies);
   res.cookie('user_id' , 34);
   return res.render('home' , {
       title: "HOME"
   });
    // res.end('<h1>express is up for codeial </h1>');
}