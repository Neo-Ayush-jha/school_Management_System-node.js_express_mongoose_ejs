var StudentModel = require('../models/StudentModel');
function studentAuthorizedCheck(req,res,next){
     StudentModel.findById(req.session.student_id).exec(function(error, student){
        if(error){
            return(error);
        }
        else{
            if(student){
                res.redirect("/student/dashboard")
            }
            else{
                return next();
            }
        }
    })
}
function studentAuthorized(req,res,next){
     StudentModel.findById(req.session.student_id).exec(function(error, student){
        if(error){
            return(error);
        }
        else{
            if(student === null){
                res.redirect("/student/login")
            }
            else{
                return next();
            }
        }
    })
}

module.exports = {studentAuthorized, studentAuthorizedCheck};