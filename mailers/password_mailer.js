
const nodeMailer = require('../config/nodemailer');

exports.resetPassword = (userMail , token ) => {
    let htmlString = nodeMailer.renderTemplate({token: token} , '/reset/reset_pass.ejs');

    nodeMailer.transporter.sendMail({
        from: 'divyanshuji123456@gmail.com',
        to: userMail,
        subject: "RESET YOUR PASSWORD",
        html: htmlString
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