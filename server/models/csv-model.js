const mongoose = require("mongoose");
const csvSchema = new mongoose.Schema({
    name:{type:String,required:true},
    designation:{type:String,required:true},
    company:{type:String,required:true,trim:true},
    industry:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    email:{type:String,required:true},
    country:{type:String,required:true},
    user:{type:String}
    

},{versionKey:false})

const CSV = new mongoose.model("CSVdata",csvSchema);
module.exports = CSV;