const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLikes = async function(req , res ){
  //url : /likes/toggle/?id=abcde&type=Post
  
  try{
    let likeable;
    let deleted = false;
  
    if(req.query.type == 'Post' ){
      likeable = await Post.findById(req.query.id).populate('likes');
    }else{
      likeable = await Comment.findById(req.query.id).populate('likes');
    }
    
    // check if a like already exists
    let existingLike = await Like.findOne({
        
        likeable: req.query.id,
        onModel: req.query.type,
        user: req.user._id

    });

    if(existingLike){
      // if like already exists
      
        likeable.likes.pull(existingLike._id);
        likeable.save();
        
        existingLike.remove();

        deleted = true;
    }else{
        // if there is no like , make new one 
        let newLike = await Like.create({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });
        
        likeable.likes.push(newLike._id);
        likeable.save();
    }

    return res.json(200 , {
        message: "Request Successfull",
        data: {
            // this info need to be send to toggle like button
            deleted: deleted
        }
    })
  
  }catch(err){
      console.log(err);
      return res.json(500 , {
        message: "Internal Server Error"
      })
    }
  
}