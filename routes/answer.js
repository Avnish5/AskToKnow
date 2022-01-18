
const express=require('express');
const router=express.Router();

const answercontroller=require('../controllers/answer_controller');

router.post('/create',answercontroller.create);
router.post('/createanswer',answercontroller.createanswer);
router.get('/show_answer/:id',answercontroller.showanswer);
router.get('/delete-answer/:id',answercontroller.deleteanswer);

module.exports=router;
