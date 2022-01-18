const express=require('express');
const router=express.Router();
const passport=require('passport');

const usercontroller=require('../controllers/user_controller');
router.get('/exp',usercontroller.experiment);

router.post('/createuser',usercontroller.createuser);
router.get('/sign_up',usercontroller.sign_up);
router.get('/sign_in',usercontroller.sign_in);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'}

),usercontroller.createsession);


router.get('/destroysession',usercontroller.destorysession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign_in'}),usercontroller.createsession);

module.exports=router;