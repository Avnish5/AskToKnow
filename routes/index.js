//adding the "passport" module
const passport=require('../config/passport-local-statergy');

const express=require('express');
const router=express.Router();

const questioncontroller=require('../controllers/question_controller');
const usercontroller=require('../controllers/user_controller');


//router to handle the "/home" request
router.get('/',usercontroller.sign_in);
router.get('/home',passport.checkAuthentication,questioncontroller.all_questions);

//using the another router file for handling "/users/.." request
router.use('/users',require('./user'));

//using the another router file for handling "/question/.." request
router.use('/question',require('./question'));


//using the another router file for handling "/answer/.." request
router.use('/answer',require('./answer'));


//using the another router file for handling "/contact/.." request
router.use('/contact-us',require('./contact_us'));


//using another router file for handling "/profile/.. " request
router.use('/profile',require('./profile'));


module.exports=router;