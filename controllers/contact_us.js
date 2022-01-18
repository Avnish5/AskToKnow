//adding the "contact" model
const contactdb=require('../models/contact');

//Rendwering the contact_us page
module.exports.contact=(req,res)=>{

    return res.render('contact_us');
}

//adding the query into database
module.exports.addquery=(req,res)=>{

    contactdb.create({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message,
    },(err,query)=>{

        if(err){
            console.log("There is an error while adding the query into database",err);
            req.flash('error','There is an internal error');
            return res.render('contact_us');
        }

        
        req.flash('success','Your query is submitted');
        return res.redirect('/contact-us');
        

    })
    

}