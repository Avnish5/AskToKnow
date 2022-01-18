//adding the mongoose
const mongoose=require('mongoose');

//creating the schema
const answerSchema=mongoose.Schema({
    answer:{
        type:String,
        required:true,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },

    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'question',
    }
},{
    timestamps:true,
}
    
);


//creating the model
const answer=mongoose.model('answer',answerSchema);

//exporting the model
module.exports=answer;