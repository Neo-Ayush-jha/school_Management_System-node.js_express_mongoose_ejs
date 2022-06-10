var mongoose = require("mongoose");
var MonthlyFeeSchema = mongoose.Schema({
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:"student"},
    monthly_fee: {type:String,default:0},
    course_id: {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    total_amount:{type:Number},
    month:{type:String,require:true},
    year:{type:String,require:true},
    p_status : {type:String,default:0},
    date: {type:Date,default:Date.now('Y-m-d ')},
});
var MonthlyFeeModel = mongoose.model("MonthlyFee",MonthlyFeeSchema);
module.exports=MonthlyFeeModel;