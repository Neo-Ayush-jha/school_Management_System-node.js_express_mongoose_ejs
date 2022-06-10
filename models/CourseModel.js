var mongoose = require("mongoose");
var Course_schema = mongoose.Schema({
    Course_name : {type:String},
    teacher_id:{type:mongoose.Schema.Types.ObjectId,ref:'teacher'},
    price : {type:Number},
    age_student : {type:Number},
    course_1: {type:String},
    course_2: {type:String},
    course_3: {type:String},
    course_4: {type:String},
    course_5: {type:String},
    course_6: {type:String},
    status : {type:String,default:0},
});
var CourseModel = mongoose.model("course",Course_schema);
module.exports=CourseModel;