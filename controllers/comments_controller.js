
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

