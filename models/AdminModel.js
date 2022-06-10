var mongoose = require("mongoose");
var Admin = mongoose.Schema({
    admin_name : {type:String,},
    admin_mobile : {type:Number,},
    admin_email : {type:String,},
    admin_password : {type:String,},
    admin_image : {type:String,default:null},
    admin_status : {type:String,default:0},
});
var AdminModel = mongoose.model("admin",Admin);
module.exports=AdminModel;