var mongoose = require("mongoose");
var Fee = mongoose.Schema({
    monthlyfee_id: {type:mongoose.Schema.Types.ObjectId,ref:"monthlyfee"},
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:"student"},
    course_id: {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    total_amount:{type:Number},
    month:{type:String,require:true},
    year:{type:String,require:true},
    status : {type:String,default:0},
    date: {type:Date,default:Date.now('Y-m-d ')},
});
var MonthlyFeeModel = mongoose.model("Fee",Fee);
module.exports=MonthlyFeeModel;