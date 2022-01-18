//adding the "kue" module
const kue=require('kue');


//creating the queue
const queue=kue.createQueue();


//exporting the queue
module.exports=queue