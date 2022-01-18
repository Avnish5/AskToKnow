//Adding the path,ejs and nodemailer module
const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
const env=require('./enviorment');


//creating the transporter
console.log(env);
let transporter=nodemailer.createTransport(env.smtp);


//creating to render the template from views folder
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        (err,template)=>{
            if(err){
                console.log(err);
                return;
            }
            mailHTML=template
        }
    )
    return mailHTML;

}

//export
module.exports={
    transporterL:transporter,
    renderTemplate:renderTemplate,
}