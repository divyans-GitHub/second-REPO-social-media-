
const Post = require('../models/post');

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
  Post.find({}).populate('user').exec(function(err , posts){
                                        if(err){
                                            console.log('error in findind post when home action is called');
                                            return;
                                        }
                                        return res.render('home' , {
                                            title: "codeial | HOME",
                                            posts: posts // right side posts is one of args in above call back func.
                                        });
                                       }
                                    );
   
    // res.end('<h1>express is up for codeial </h1>');
}