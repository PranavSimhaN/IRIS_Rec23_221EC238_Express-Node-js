var mongoose=require("mongoose");

const counter1Schema = new mongoose.Schema({
    code:{
        type:String
    },
    seq:{
        type:Number
    }
});

module.exports= new mongoose.model("Counter1",counter1Schema);