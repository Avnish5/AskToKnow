const questiondb=require('../models/question');
const userdb=require('../models/user');
const answerdb=require('../models/answer');


//creating the question
module.exports.create=(req,res)=>{
    console.log(req.user);
    questiondb.create({
        question:req.body.question,
        user:req.user._id,


    },(error,questions)=>{
        if(error)
        {
            console.log("There is an error while adding the question");
            return;
        }
        req.flash('success','Question Submitted');
        return res.redirect('/home');
    })

}



module.exports.askquestion=(req,res)=>{
  
    return res.render('askquestion');
}



module.exports.all_questions=(req,res)=>
{
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

            return res.render('all_questions',{
                allquestions:questions,
            })
        })

}


//deleting the question
module.exports.deletequestion=(req,res)=>{
     
    //find whether question exist in database
    questiondb.findById(req.params.id,(err,question)=>{
        if(err)
        {
            console.log(err);
            req.flash('error','There is an internal error');
            return res.render('all_questions');
        }
        
        //checking whether the question is posted by current login user
        if(question.user==req.user.id){
             
           //removing the question
            question.remove();
            //deleting the the answers associated with quuestion
            answerdb.deleteMany({question:req.params.id},(err,answer)=>{
                if(err)
                {
                    console.log(err);
                    req.flash('error','There is an internal error');
                    return res.render('all_questions');
                }
                 req.flash('error',"Question is deleted");
                return res.redirect('/question/all_questions');
            })
        }
    })
}