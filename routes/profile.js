//adding the "passport" module
const passport=require('../config/passport-local-statergy');

const express=require('express');
const router=express.Router();

//adding the profile controller
const profilecontroller=require('../controllers/profile_controller');


//router for "/edit-profile"
router.get('/edit-profile',passport.checkAuthentication,profilecontroller.editprofile);

//router for "/update-profile"
router.post('/update-profile',passport.checkAuthentication,profilecontroller.updateprofile);


module.exports=router;