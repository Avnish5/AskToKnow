const questiondb=require('../models/question');
const converter = require('json-2-csv');

module.exports.home=(req,res)=>{
   
        questiondb.find({}).
        populate('user').
        populate({
            path:'answer',
            populate:{
                path:'user'
            }
        }).
        
        
        exec((error,questions)=>{
            if(error)
            {
                console.log("There is an error while dosplaying the questions");
            }

            

            return res.render('home',{
                question:questions,
            })
        })

        
            
           
    
    
}

