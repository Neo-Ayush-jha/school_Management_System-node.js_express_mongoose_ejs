const AdminModel = require("../models/AdminModel");

function adminAuthorizedCheck(req,res,next){
    AdminModel.findById(req.session.admin_id).exec(function(error,admin){
        if(error){
            return(error);
        }
        else{
            if(admin){
                res.redirect("/admin/dashboard")
            }
            else{
                return next();
            }
        }
    })
}
function adminAuthorized(req,res,next){
    AdminModel.findById(req.session.admin_id).exec(function(error,admin){
        if(error){
            return(error);
        }
        else{
            if(admin === null){
                res.redirect("/admin/login")
            }
            else{
                return next();
            }
        }
    })
}

module.exports = {adminAuthorized, adminAuthorizedCheck};