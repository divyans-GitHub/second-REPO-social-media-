
const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (userMail , comment) => {
    console.log("inside newComment mailer" );
    let HTMLString = nodeMailer.renderTemplate({comment: comment} , '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'divyanshuji123456@gmail.com',
       to: userMail,
       subject: "New comment on CODEIAL",
       html: HTMLString
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

