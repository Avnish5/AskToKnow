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
            user://add your smtp username here,
            pass://add your smtp username here,
        }
    },

    google_clientID://add your google client id,
    google_clientSecret://add your google client id,
    google_callbackURL://add your google callback url here,
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

