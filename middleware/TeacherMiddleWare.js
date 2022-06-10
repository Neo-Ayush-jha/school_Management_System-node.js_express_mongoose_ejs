const TeacherModel = require('../models/TeacherModel');
function teacherAuthorizedCheck(req,res,next){
     TeacherModel.findById(req.session.teacher_id).exec(function(error, student){
        if(error){
            return(error);
        }
        else{
            if(student){
                res.redirect("/teacher/dashboard")
            }
            else{
                return next();
            }
        }
    })
}
function teacherAuthorized(req,res,next){
     TeacherModel.findById(req.session.teacher_id).exec(function(error, student){
        if(error){
            return(error);
        }
        else{
            if(student === null){
                res.redirect("/teacher/login")
            }
            else{
                return next();
            }
        }
    })
}

module.exports = {teacherAuthorized, teacherAuthorizedCheck};