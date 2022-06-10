var mongoose = require("mongoose");
var Class = mongoose.Schema({
    class_name : {type:String,require:true},
    class_admission_fee: {type:Number,require:true},
    class_readmission_fee: {type:Number,require:true},
    class_monthly_fee: {type:Number,require:true,require:true},
    class_extera_charges: {type:Number,default:null},
    class_books_fee: {type:Number,require:true},
    admin_id: {type:mongoose.Schema.Types.ObjectId,ref:"admin"},
    class_status: {type:String,default:0},
});
var ClassModel = mongoose.model("class",Class);
module.exports=ClassModel;