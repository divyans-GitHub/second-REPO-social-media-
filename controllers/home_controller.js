module.exports.home = function(req , res ){
   
   return res.render('home' , {
       title: "HOME"
   });
    // res.end('<h1>express is up for codeial </h1>');
}