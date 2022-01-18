const queue=require('../config/kue');

const newuserMailer=require('../mailers/newuser');

queue.process('newuser',(job,done)=>{
    
    
    newuserMailer.newuser(job.data);
    done();
})