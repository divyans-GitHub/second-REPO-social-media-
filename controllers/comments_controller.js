
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/users')
const commentsMailer = require('../mailers/comments_mailer');

const queue = require('../config/kue');
const commentEmailWorker = require('../kue_workers/comment_email_worker');

const Like = require('../models/like');

// module.exports.create = function(req , res ){
//   //we first find post by post id in hidden input form such that no one feedle and change post id by inspecting
   
//   Post.findById(req.body.post , function(err , post){
//       if(err){

//       }
//      if(post){
//          Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//          } , function(err , comment ){
//              if(err){

//              }
//              // now I ve created comment now push this to respective Post
//              // this comes under updation process
//              post.comments.push(comment);
//              //now save in DB
//              post.save();
//              res.redirect('/');
//          } );
//      }

//   });

// }

/*  some changed part that was not working
//using async await
module.exports.create = async function(req , res ){
  
 //comment.populate('user' , 'name email').execPopulate().sort('-createdAt');
    
   //  commentsMailer.newComment(comment);
     if(req.xhr){
        // put in line 51 for populating everytime
        await comment.execPopulate('user').sort('-createdAt');
       return res.status(200).json({
         data :{
          comment: comment
         },
         message: "comment added successfully"
       }) 
}
*/



module.exports.create = async function(req , res ){
  try{
    let post = await Post.findById(req.body.post);
  
    if(post){
     let comment = await Comment.create({
             content: req.body.content,
             post: req.body.post,
             user: req.user._id
      });
      post.comments.push(comment);
      //now save in DB
     post.save();
      
     let user = await User.findById(req.user._id);
     //console.log(user.email);
     //comment.populate('user' , 'name email').execPopulate().sort('-createdAt');
     comment.execPopulate('user');
     /*
     commentsMailer.newComment(user.email , comment);
     commenting this part because this will now done by workers
     */
      let job = queue.create('emails' , comment ).save( function(err){
        if(err){
         console.log('ERROR in creating a job' , err);
         return;
        }
        console.log('JOB ENQUEUED' , job.id );
      });


     if(req.xhr){
      
       return res.status(200).json({
         data :{
          comment: comment
         },
         message: "comment added successfully"
       })
     }

     req.flash('success' , "Your comment is added");
     res.redirect('/');

    }
  
  }catch(err){
    req.flash('error' , err);
    return res.redirect('back');
  }
}






// // to destroy a comment
// module.exports.destroy = function(req , res ){
//  Comment.findById(req.params.id , function(err , comment){
//      if(err){
//          console.log("Error in finding comment which is requested for delete");
//          return;
//      }
//      if(comment){
//           //comment.user == req.user.id ||
//           //var PostUser;
//           Post.findById(comment.post , function(err , post){
//              //console.log(post.content , post.user);
//              if( req.user.id == comment.user || req.user.id == post.user ){
//                   let postId = comment.post;
            
//                   comment.remove();

//                   Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id}} , function(err , post){
//                     if(err){console.log('error in finding comment inpost'); return;}
//                     return res.redirect('back');
//                   });
//                 }
//           });
//                //console.log(postUser);
             
//      }else{
//         return res.redirect('back'); 
//      }
//  });

// }


// using async await
module.exports.destroy = async function(req , res ){
  
  try{
    let comment = await Comment.findById(req.params.id);
    if(comment){
     
      let post = await Post.findById(comment.post );
      
      if( req.user.id == comment.user || req.user.id == post.user ){
        let postId = comment.post;
        
        await Like.deleteMany({likeable: comment._id , onModel: 'Comment'});

        comment.remove();
  
        let correspondingPost = await Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id}} ); 
        
        
        
        if(req.xhr){
          return res.status(200).json({
            data :{
             comment_id: req.params.id
            },
            message: "comment removed"
          })
        }
        
        req.flash('success' , 'comment is deleted');
        return res.redirect('back');
    
      }
      
    }else  return res.redirect('back'); 
  
  }catch(err){
    req.flash('error' , err);
    return res.redirect('back');
  }
  
       
}


