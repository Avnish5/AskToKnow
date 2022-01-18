//adding the mongoose
const mongoose=require('mongoose');

//creating the schema
const questionSchema=mongoose.Schema({

    question:{
        type:String,
        required:true,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },

    answer:[
      
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'answer',
        }
    ],
    
},{
    timestamps:true,
}
    
);

//creating the model
const question=mongoose.model('question',questionSchema);

//exporting the model
module.exports=question;



