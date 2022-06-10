var mongoose = require("mongoose");
var OrderSchema = mongoose.Schema({
    studentId: {type:mongoose.Schema.Types.ObjectId,ref:"student"},
    course_id : {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    doj: {type:Date},
    status:{type:Number,require:true,default:1},
});
var OrderModel = mongoose.model("order",OrderSchema);
module.exports=OrderModel;

