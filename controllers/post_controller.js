const Post = require('../models/post');

const Comment = require('../models/comment');

const Like = require('../models/like');

module.exports.post =  async function(req , res ){
   //res.end('<h1>this is my Post Please Hit Like</h1> ');
  try{
     let post = await Post.create({
      //storing data of form in post
      content: req.body.content,
      user:  req.user._id
     });
     
     if(req.xhr){
        await post.populate('user').execPopulate();
        return res.status(200).json({
           data:{
            post:post
           },
           message: "post created successfully"
        })
     }

     req.flash('success' , "Post Published :)")

     return res.redirect('back');

  }catch(err){
   req.flash('error' , err);
   return res.redirect('back');
 }
  
//   , function(err , post){
//      if(err){
//         console.log('Error ! in creating post');
//         return;
//      }
//      return res.redirect('back');
//   });
// here not needded to convert in async await but still doing

}




// module.exports.destroy =  function(req , res ){
//    //first find post by id such that remove is called on valid post
//    Post.findById(req.params.id , function(err , post){
//          if(err){
//             console.log("Error! no such post exists in DB , may be someone fiddle");
//             return;
//          }
//          if(post){
//             //now check whether someone else is not deleting other's post
//             if( post.user == req.user.id ){
//                //.id changes objectId in string
//                post.remove();
//                //delete comment associated with that post
//                //for that require comment from models folder
//                Comment.deleteMany({post: req.params.id} ,function(err){
//                  return res.redirect('back');
//                });  
//             }
//          }else{
//             return res.redirect('back');
//          }
//    });
// }


//using async await
module.exports.destroy = async function(req , res ){
   try{
      let post = await Post.findById(req.params.id);
   
      if( post.user == req.user.id ){
         //.id changes objectId in string
         
         // delete likes associated with the post
         await Like.deleteMany({likeable: post , onModel: 'Post'});
         // delete likes associated with comments
         await Like.deleteMany({_id: {$in: post.comments}});


         post.remove();
         //delete comment associated with that post
         //for that require comment from models folder
         await Comment.deleteMany({post: req.params.id} );  
         
         


         if(req.xhr){
            return res.status(200).json({
               data: {
                  post_id: req.params.id
               },
               message: "Post Deleted"
            })
         }

         req.flash('success' , "Post and associated comments get deleted!");
         return res.redirect('back');
      }else{
         req.flash('error' , "you are not authorised to delete this post");
         return res.redirect('back');
      }
   
   }catch(err){
      req.flash('error' , err);
      return res.redirect('back');
   }
  
}

