//adding the "passport" module
const passport=require('../config/passport-local-statergy');

const express=require('express');
const router=express.Router();

const questioncontroller=require('../controllers/question_controller');

router.post('/create',questioncontroller.create);
router.get('/askquestion',passport.checkAuthentication,questioncontroller.askquestion);
router.get('/all_questions',passport.checkAuthentication,questioncontroller.all_questions);
router.get('/delete-question/:id',passport.checkAuthentication,questioncontroller.deletequestion);


module.exports=router;