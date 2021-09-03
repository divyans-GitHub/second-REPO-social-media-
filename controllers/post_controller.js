const Post = require('../models/post');

const Comment = require('../models/comment');

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


module.exports.destroy = function(req , res ){
   //first find post by id such that remove is called on valid post
   Post.findById(req.params.id , function(err , post){
         if(err){
            console.log("Error! no such post exists in DB , may be someone fiddle");
            return;
         }
         if(post){
            //now check whether someone else is not deleting other's post
            if( post.user == req.user.id ){
               //.id changes objectId in string
               post.remove();
               //delete comment associated with that post
               //for that require comment from models folder
               Comment.deleteMany({post: req.params.id} ,function(err){
                 return res,redirect('back');
               });  
            }
         }else{
            return res.redirect('back');
         }
   });
}