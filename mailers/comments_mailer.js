/*
const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (userMail) => {
    console.log("inside newComment mailer" , comment);

    nodeMailer.transporter.sendMail({
       from: 'divyanshuji123456@gmail.com',
       //to: comment.user.email,
       to:userMail,
       subject: "New Comment is made on your post",
       html: '<h1> commented on your post</h1>'
    },
    (err , info) => {
       if(err){
         console.log('Error in sending mail' , err);
         return;  
       }

       console.log('message sent' , info );
       return;
    }
    );
}
*/


const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (userMail) => {
    console.log("inside newComment mailer" );

    nodeMailer.transporter.sendMail({
       from: 'divyanshuji123456@gmail.com',
       to: userMail,
       subject: "New comment on CODEIAL",
       html: '<h1> Your comment has been published</h1>'
    },
    (err , info) => {
       if(err){
         console.log('Error in sending mail' , err);
         return;  
       }

       console.log('message sent' , info );
       return;
    });
}

