const rfs=require('rotating-file-stream');
const fs=require('fs');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access_log',{
    interval:'1d',
    path:logDirectory,
});

const development={
    name:'development',
    assets_path:'./assets',
    session_cookie_key:'something',
    db:'AskToKnow_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.email',
        port:587,
        secure:false,
        auth:{
            user:'Avnein4988@gmail.com',
            pass:'exfcvgudcalgmjzb',
        }
    },

    google_clientID:'684876763125-ngn1ebdjddpgeimhuai35l6irnjugg7k.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}



const production={
    name:'production',
    assets_path:process.env.ASKTOKNOW_assets_path,
    session_cookie_key:process.env.ASKTOKNOW_session_cookie_key,
    db:'AskToKnow_production',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.email',
        port:587,
        secure:false,
        auth:{
            user:process.env.ASKTOKNOW_smtp_user,
            pass:process.env.ASKTOKNOW_smtp_pass,
        }
    },

    google_clientID:process.env.ASKTOKNOW_google_clientID,
    google_clientSecret:process.env.ASKTOKNOW_google_clientSecret,
    google_callbackURL:process.env.ASKTOKNOW_google_callbackURL,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}



module.exports=production;

