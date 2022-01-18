const express=require('express');
const router=express.Router();

const contactcontroller=require('../controllers/contact_us');
router.get('/',contactcontroller.contact);
router.post('/add-query',contactcontroller.addquery);


module.exports=router;