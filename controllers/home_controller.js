
const Post = require('../models/post');

const User = require('../models/users');

/*
module.exports.home = function(req , res ){
   //console.log(req.cookies);
   //res.cookie('user_id' , 34);

//    Post.find({} , function(err , posts){
//             if(err){
//                 console.log('error in findind post when home action is called');
//                 return;
//             }
//             return res.render('home' , {
//                 title: "codeial | HOME",
//                 posts: posts // right side posts is one of args in above call back func.
//             });
//    });

   

  // populate the user of each post
  Post.find({})
  .populate('user')
  .populate({
      //post.js file in models folder has field name as comments and user , that is what mentioned in path below

      path: 'comments',
      populate: {
          path: 'user'
      }
  })
  .exec(function(err , posts){
        if(err){
            console.log('error in findind post when home action is called');
            return;
        }
     User.find({} , function(err , users){
        return res.render('home' , {
            title: "codeial | HOME",
            posts: posts, // right side posts is one of args in above call back func.
            all_users: users
        });
     });
    }
    );
   
    // res.end('<h1>express is up for codeial </h1>');
}
*/


// using async await we can be safe from this nested callbacks(callback hell)

module.exports.home = async function( req , res ){
    try{
         let posts = await Post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
             //post.js file in models folder has field name as comments and user , that is what mentioned in path below
       
             path: 'comments',
             populate: {
                path: 'user'
             },populate: {
                path: 'likes'
             }
            }).populate('likes');
         
         let users = await User.find({});
         let loggedInUser;
         if(req.user){   //  Find all the friends of the user if user is logged in
                loggedInUser = await User.findById(req.user.id)
                .populate({
                path:'friendships',
                populate:{
                path:'from_user'   
                }
                }).populate({
                path:'friendships',
                populate:'to_user'
                });
        
            }
         return res.render('home' , {
             title: 'Codeial: Home',
             posts: posts,
             all_users: users,
             loggedInUser: loggedInUser
         });


    }catch(err){
        console.log('Error !' , err );
        return;
    }

}





