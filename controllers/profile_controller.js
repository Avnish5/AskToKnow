const userdb=require('../models/user');


//updating the profile
module.exports.updateprofile=(req,res)=>{

    //finding the user by id
    userdb.findById(req.user.id,(err,user)=>{
        
        if(err)
        {
            console.log("There is an error while updating the user profile",err);
            req.flash('error',"There is an internal error!");
            return res.render('edit-profile');
        }

        //if user is not found
        if(!user){
            
            req.flash('error',"Sorry user is not found!");
            return res.redirect('/profile/edit-profile');    

        }
       
        user.name=req.body.name;
        user.email=req.body.email;
        user.password=req.body.password;
        user.save();
        req.flash('success','Your profile is updated');
        return res.redirect('/profile/edit-profile');
        
          
    })    
}

//rendering the edit-profile page
module.exports.editprofile=(req,res)=>{

    return res.render('edit_profile');
}