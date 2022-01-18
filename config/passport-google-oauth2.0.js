const passport=require('passport');
const googleStatergy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const userdb=require('../models/user');
const env=require('./enviorment');



passport.use(new googleStatergy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL,
    },

    function(accessToken,refreshToken,profile,done){
        userdb.findOne({email:profile.emails[0].value}).exec((error,user)=>{
            if(error){console.log("There is an error while finding user in google-statergy");return;}

            if(user)
            {
                return done(null,user);
            }
            else{
                userdb.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },(error,user)=>{
                    if(error)
                    {
                        console.log("There is an error while creating user in google-statergy",error);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }


))

module.exports=passport;