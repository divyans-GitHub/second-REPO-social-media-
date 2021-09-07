
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req , res ){
  //we first find post by post id in hidden input form such that no one feedle and change post id by inspecting
   
  Post.findById(req.body.post , function(err , post){
      if(err){

      }
     if(post){
         Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
         } , function(err , comment ){
             if(err){

             }
             // now I ve created comment now push this to respective Post
             // this comes under updation process
             post.comments.push(comment);
             //now save in DB
             post.save();
             res.redirect('/');
         } );
     }

  });

}

// to destroy a comment
module.exports.destroy = function(req , res ){
 Comment.findById(req.params.id , function(err , comment){
     if(err){
         console.log("Error in finding comment which is requested for delete");
         return;
     }
     if(comment){
          //comment.user == req.user.id ||
          //var PostUser;
          Post.findById(comment.post , function(err , post){
             //console.log(post.content , post.user);
             if( req.user.id == comment.user || req.user.id == post.user ){
                  let postId = comment.post;
            
                  comment.remove();

                  Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id}} , function(err , post){
                    if(err){console.log('error in finding comment inpost'); return;}
                    return res.redirect('back');
                  });
                }
          });
               //console.log(postUser);
             
     }else{
        return res.redirect('back'); 
     }
 });

}


