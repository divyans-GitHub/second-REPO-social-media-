// email worker do the job that used to be done by comment_controller
const User = require('../models/users.js');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const queue = require('../config/kue');


const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails' , function( job , done ){
    console.log('email worker is processing a job' , job.data );
   
    //I need to populate this comment coz newComment in commentsMailer has first argument as email of user who made comment.
    Comment.findById(job.data._id).populate('user').exec( function(err , comment ){
        if(err){
            console.log("ERROR IN FINDING REQUIRED COMMENT :" , err );
            return;
        }
        commentsMailer.newComment(comment.user.email , job.data );
    });
   

    done();
});
