var mongoose=require("mongoose");

const counterSchema = new mongoose.Schema({
    code:{
        type:String
    },
    seq:{
        type:Number
    },
    id:{
        type:Number
    }
});

module.exports= new mongoose.model("Counter",counterSchema);