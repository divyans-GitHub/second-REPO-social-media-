
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const { post } = require('../../../routes/api/v1/post');

const User = require('../../../models/users');


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
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id ){
            post.remove();
            //delete comment associated with that post
            //for that require comment from models folder
            await Comment.deleteMany({post: req.params.id} );  
            

            //req.flash('success' , "Post and associated comments get deleted!");
            return res.status(200).json({
             message: "post and its comments deleted"
            });
        }else{
            return res.json(401 , {
                message: "You can not delete this post!"
            })
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        
        });
    }
   
}