//initialize the express
const express=require('express');
const app=express();
const port=8000;
const logger=require('morgan');
const path=require('path');
const env=require('./config/enviorment');




//add the config file which use to connect to mongo db
const db=require('./config/mongoose');
const userdb=require('./models/user');



const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local-statergy');
const passportGoogle=require('./config/passport-google-oauth2.0');
const MongoStore=require('connect-mongo')(session);

//adding the 'connect-flash' module
const flash=require('connect-flash');
const customware=require('./config/middleware');



//body-parse
const { urlencoded } = require('express');
app.use(express.urlencoded({extended: false}));

//cookie-parser
const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(logger(env.morgan.mode,env.morgan.options))

//setuup express-ejs-layout
const expresslayout=require('express-ejs-layouts');
app.use(expresslayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);






//setup the view engine
app.use(express.static('./assets')); //fix there is an error while using env.assets_path
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.use(session({

    name:'AskToKnow',
    secret:env.session_cookie_key,//session_cookie_key
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*60)
    },
    //storing the session
store: new MongoStore(
    {
    autoRemove:true,
    mongooseConnection:db,
},(error)=>{
    if(error)
    {
        console.log(error);
    }
}),
}))


//create middlware for passport,session
app.use(passport.initialize());
app.use(passport.session());



//setup the current user as an object in request
app.use( passport.setAuthenticatedUser);

app.use(flash());
app.use(customware.setFlash);

//adding the main route file
app.use('/',require('./routes/index'));

//start listening top the server
app.listen(port,(error)=>{
    if(error)
    {
        console.log(`There is an error at port no.-${port}`);
    }

    console.log(`Server is running succcesfully at port ${port}`);
})

