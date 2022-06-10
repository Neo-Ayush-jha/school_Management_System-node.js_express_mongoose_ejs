var mongoose = require('mongoose')

var PaymentModel = mongoose.Schema({
    t_id:{type:mongoose.Schema.Types.ObjectId,ref:"teacher"},
    month:{type:String,require:true},
    year:{type:String,require:true},
    dop:{type:Date,require:true},
    status:{type:Number, require:true,default:0},
    amount:{type:Number, require:true}

});

var payment = mongoose.model("salarypayments",PaymentModel)

module.exports = payment;