var mongoose = require('mongoose')

var PaymentModel = mongoose.Schema({
    teacher_id:{type:mongoose.Schema.Types.ObjectId,ref:"teacher"},
    month:{type:String,require:true},
    year:{type:String,require:true},
    dop:{type:Date,require:true},
    amount:{type:Number, require:true},
    status:{type:Number, require:true,default:0},
});

var payment = mongoose.model("teacher_salary",PaymentModel)

module.exports = payment;