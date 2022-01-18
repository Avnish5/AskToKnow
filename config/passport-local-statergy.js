const passport=require('passport');
const LocalStratergy=require('passport-local').Strategy;
const userdb=require('../models/user');

passport.use(new LocalStratergy({

    usernameField:'email'
},

function(email,password,done){
    userdb.findOne({email:email},(error,user)=>{
        if(error)
        {
            console.log(`There is an error${error}`);
            return done(err);
        }

        if(!user||user.password!=password)
        {
            return done(null,false);
        }

        return done(null,user);
    })
}


))

passport.serializeUser((user,done)=>{
    return done(null,user.id);

});

passport.deserializeUser((id,done)=>{

    userdb.findById(id,(error,user)=>{
        if(error)
        {
            console.log(error);
            return done(error);
        }

        return done(null,user);
    })

});

passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated())
    {
        return next();
    }

    return res.redirect('/users/sign_in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;