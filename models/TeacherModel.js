var mongoose = require("mongoose");
var Teacher = mongoose.Schema({
    t_name : {type:String,require:true},
    t_age : {type:Number,require:true},
    t_mobile : {type:Number,require:true},
    t_salary : {type:Number,require:true},
    t_email : {type:String,require:true},
    t_address : {type:String,require:true},
    t_specilization : {type:String,require:true},
    course_id: {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    course_id: {type:String,require:true},
    t_dob : {type:Date,require:true},
    t_gender : {type:String,require:true},
    t_password : {type:String,require:true},
    doj : {type:Date,default:Date.now},
    t_status : {type:String,default:0},
    salary_status : {type:String,default:0},
});
var TeacherModel = mongoose.model("teacher",Teacher);
module.exports=TeacherModel;