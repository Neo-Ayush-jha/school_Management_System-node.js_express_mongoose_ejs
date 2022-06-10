var mongoose = require("mongoose");
var Asset = mongoose.Schema({
    Asset_name : {type:String},
    Asset_quentity : {type:Number},
    image:{
        type:String,
        require:true
    }

});
var AssetModel = mongoose.model("asset",Asset);
module.exports=AssetModel;