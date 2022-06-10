var mongoose = require("mongoose");
var OrderDataSchema = mongoose.Schema({
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:"student"},
    monthly_fee: {type:String,default:0},
    course_id: {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    total_amount:{type:Number},
    month:{type:String,require:true},
    year:{type:String,require:true},
    status : {type:String,default:0},
    date: {type:Date,default:Date.now('Y-m-d ')},
});
var OrderDataModel = mongoose.model("order_data",OrderDataSchema);
module.exports=OrderDataModel;