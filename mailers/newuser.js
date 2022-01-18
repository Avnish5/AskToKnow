//adding the nodemailer config file
const nodemailer=require('../config/nodemailer');

//end point handling the email sending to new user
exports.newuser=(user)=>{
    
    
    let htmlString=nodemailer.renderTemplate({i:user},'/new_user/new_user.html');

    nodemailer.transporterL.sendMail({
        from:'Avnein4988@gmail.com',
        to:user.email,
        subject:'Welcome to AskToKnow',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(info);
        return;
    })
}