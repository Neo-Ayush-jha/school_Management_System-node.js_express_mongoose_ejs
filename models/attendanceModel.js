// var mongoose = require("mongoose");
// var studentAttendanceSchema = mongoose.Schema({
//     date:{type:String,required:true},
//     attendance:[
//         {
//             student_id:{type:mongoose.Schema.Types.ObjectId,ref:'student'},
//             a_status:{type:String,default:'A'}
//         }
//     ],
//     course_id:{type:mongoose.Schema.Types.ObjectId,ref:'course'}

// });
// var studentAttendanceModel = mongoose.model("studentAttendance",studentAttendanceSchema);
// module.exports=studentAttendanceModel;






var mongoose = require("mongoose");
var ATTENDENCE = mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId,ref:'student'},
    date:{type:Date,default:Date.now},
    day_name:{type:String,required:true},
    month_name:{type:String,required:true},
    year_name:{type:String,required:true},
    time:{type:String,required:true},
    a_status:{type:String,default:0},

});
var AttendenceModel = mongoose.model("attendence",ATTENDENCE);
module.exports=AttendenceModel;