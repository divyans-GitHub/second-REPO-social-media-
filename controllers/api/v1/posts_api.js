
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req , res){
    
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
    });

    return res.json(200 , {
        message: "api created",
        //posts: [[]]
        posts:posts
    })
}


module.exports.destroy = async function(req , res ){
    try{
        console.log(req.params.id);
       let post = await Post.findById(req.params.id);
      
       
         
         post.remove();
          //delete comment associated with that post
          //for that require comment from models folder
          await Comment.deleteMany({post: req.params.id} );  
          
        //   if(req.xhr){
        //      return res.status(200).json({
        //         data: {
        //            post_id: req.params.id
        //         },
        //         message: "Post Deleted"
        //      })
        //   }
 
          //req.flash('success' , "Post and associated comments get deleted!");
          return res.status(200).json({
              message: "post and its comments deleted"
          });
      // }else{
         // req.flash('error' , "you are not authorised to delete this post");
         // return res.redirect('back');
      // }
    
    }catch(err){
        console.log(err);
       return res.status(500).json({
           message: 'Internal server error'
          
       });
    }
   
 }