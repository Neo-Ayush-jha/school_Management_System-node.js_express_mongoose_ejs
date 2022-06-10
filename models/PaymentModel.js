var mongoose = require('mongoose')

var PaymentModel = mongoose.Schema({
    stdId:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"course"},
    month:{type:String,require:true},
    year:{type:String,require:true},
    dop:{type:Date,require:true},
    status:{type:Number, require:true,default:0},
    amount:{type:Number, require:true}
});

var payment = mongoose.model("payments",PaymentModel)

module.exports = payment;