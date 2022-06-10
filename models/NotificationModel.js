var mongoose = require("mongoose");
var notice = mongoose.Schema({
    notice : {type:String,require:true},
    teacher_id: {type:mongoose.Schema.Types.ObjectId,ref:"teacher"},
    date : {type:Date,require:true},
});
var NotificationModel = mongoose.model("notification",notice);
module.exports=NotificationModel;