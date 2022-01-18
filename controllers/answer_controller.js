const answerdb=require('../models/answer');
const questiondb=require('../models/question');


module.exports.createanswer=(req,res)=>{
    
    questiondb.findById(req.body.question,(error,question)=>{
        if(error)
        {
            cobnsole.log(error);
        }

        if(question)
        {
            answerdb.create({
                answer:req.body.answer,
                user:req.user._id,
                question:req.body.question



            },(error,answer)=>{
                if(error)
                {
                    console.log(error);
                }

                question.answer.push(answer);
                question.save();
                req.flash('success','Your answer is get posted');

                return res.redirect('back');
            })
        }
    })

}


module.exports.create=(req,res)=>{
   

       console.log("hy");
        
          questiondb.findById(req.body.question,(err,questions)=>{
              if(err)
              {
                  console.log(error);
                  return;
              }

             
              if(questions)
              {
                answerdb.create({
                    answer:req.body.answer,
                    user:req.user._id,
                    question:req.body.question,
                },(error,go)=>{
                    if(error)
                    {
                        console.log("There is an error while adding the answer top the database");
                        return;
                    }
              questions.answer.push(go);
              questions.save();
        
               
              
              

         return res.redirect('/home');
                })
              }
          })
        
    
}

module.exports.showanswer=(req,res)=>{
   
    questiondb.findById(req.params.id).
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

            return res.render('show_answer',{
                i:questions,
            })
        })

}


//deleting the answer
module.exports.deleteanswer=(req,res)=>{
   

    //find whether answer exist or not
    answerdb.findById(req.params.id,(err,answer)=>{
        
        if(err){
            console.log(err);
            req.flash('error','There is an error');
                return res.render('show_answer');
        }
        
        //check is the cuurent user who request to delete the answer
        
         
       if(answer){
        if(answer.user==req.user.id){
           

            let temp=answer.question;
            
            
            answer.remove();
            
            //removing the answer from question array
            questiondb.findByIdAndUpdate(temp,{$pull:{answer:req.params.id}},(err,question)=>{
               
                if(err){
                    console.log(err);
                    req.flash('error','There is an error');
                    return;
                }

                req.flash('error','Answer is deleted');
               
                return res.redirect('/answer/show_answer/'+answer.question);
                
            })
            
        }
       }
       else{
           return res.redirect('/home');
       }

        
    })
    

}