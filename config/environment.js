
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');



const logDirectory = path.join(__dirname , '../production_log');
fs.existsSync(logDirectory) ||  fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log' , {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port:587,
            secure: false,
            auth:{
                user:'singhchandramani89',
                pass: 'chandramani@123'
            }
        },
    google_client_id: "387786437534-u5j7p8g9l946phdokg0i5jb89esiubps.apps.googleusercontent.com",
    google_client_secret: "P525bSp7Px7pcdKX08LTc0HK",
    google_callbackURL: "http://localhost:4000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream }
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSETS_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port:587,
            secure: false,
            auth:{
                user: process.env.CODEIAL_SMTP_USER,
                pass: process.env.CODEIAL_SMTP_PASSWORD
            }
        },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET ,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACKURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream }
    }
}


// module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
