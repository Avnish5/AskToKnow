const userdb=require('../models/user');
const converter = require('json-2-csv');
const fs=require('fs');
const path=require('path');
const downloadPath=path.join(__dirname,'../','newfile.csv');

const file=require('../')


//adding the mailer
const userMailer=require('../mailers/newuser');

const kue=require('../config/kue');
const newUserWorker=require('../workers/new_user_worker');
const queue = require('../config/kue');

module.exports.sign_up=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/question/all_questions');
    }
   return res.render('sign_up');
}

module.exports.sign_in=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/question/all_questions');
    }

    
    
     return res.render('sign_in');
 
 }



 module.exports.createsession=(req,res)=>{
     
     return res.redirect('/home');
 }

 module.exports.destorysession=(req,res)=>{
    
     req.logout();
     
     return res.redirect('/users/sign_in');
 }
module.exports.createuser=(req,res)=>{

    userdb.findOne({email:req.body.email},(err,user)=>{
        if(err)
        {
            console.log(err);
            return;
        }

        if(user)
        {
            req.flash('error','Email already exist');
            
            return res.redirect('back') ;

        }
        else{

            userdb.create({
                
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
            },(error,user)=>{
                if(error)
                {
                    console.log("There is an error while creating the user");
                    return;
                }
                //creating the request to send email by using mailers
                //userMailer.newuser(user);
                
                queue.create('newuser',user).save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                })
                req.flash('success','Account is created successfully')
        
                return res.redirect('/users/sign_in');
            })

        }
    })
    
    
}


module.exports.experiment=(req,res)=>{
    userdb.find({},(err,users)=>{
        if(err){
            console.log(err);
            return;
        }
       
        const { Parser } = require('json2csv');
const fields = [ 'email', 'password','name'];
const opts = { fields };

try {
    const parser = new Parser(opts);
    const csv = parser.parse(users);
    fs.writeFile(downloadPath, csv, function (err) {
        if (err) throw err;
        console.log('Saved!');
        return res.download(downloadPath);
      });

      


  } catch (err) {
    console.error(err);
  }

        
    })

}