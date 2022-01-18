//adding the mongoose
const mongoose=require('mongoose');


//creating the schema
const userSchema=mongoose.Schema({
email:{
    unique:true,
    type:String,
    required:true,
},

password:{
    type:String,
    required:true,
},

name:{
    type:String,
    required:true,
},

},{
    timestamps:true,
});

//creating the model
const user=mongoose.model('user',userSchema);

//exporting the model
module.exports=user;