var mongoose=require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new mongoose.Schema ({
    name:String,
    email: String,
    department:String,
    program:String,
    Student_ID:Number,
    password: String,
    stu_id:Number,
    googleId: String,
    fac_id:Number,
    phone_number:String,
    c_button:String,
    is_admin:Boolean
  });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports= new mongoose.model("User",userSchema);