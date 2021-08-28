const Post = require('../models/post');

module.exports.post = function(req , res ){
   //res.end('<h1>this is my Post Please Hit Like</h1> ');
  Post.create({
     //storing data of form in post
     content: req.body.content,
     user:  req.user._id
  } , function(err , post){
     if(err){
        console.log('Error ! in creating post');
        return;
     }
     return res.redirect('back');
  });
  
   
}