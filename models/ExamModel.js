var mongoose = require("mongoose");
var Exam = mongoose.Schema({
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:"student"},
    course_id: {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    exam_name:{type:String},
    status: {type:String,default:0},
});
var ExamModel = mongoose.model("exam",Exam);
module.exports=ExamModel;