const session = require("express-session");
const AdminModel = require("../models/AdminModel");
const AssetModel = require("../models/AssetsModel");
const ClassModel = require("../models/ClassModel");
const CourseModel = require("../models/CourseModel");
const MonthlyFeeModel = require("../models/MonthlyFee");
const StudentModel = require("../models/StudentModel");
const TeacherModel = require("../models/TeacherModel");
const attendanceModel  = require("../models/attendanceModel");
const nodemailer = require('nodemailer');

async function adminDashboard(req,res) {
    AdminsessionId = req.session.admin_id;
    var adminDetail =  await AdminModel.find({_id:AdminsessionId});
    res.render('admin/layout/app',{"adminDetail":adminDetail});
}
// function InsertAdmin(req,res){
//         var admin= new AdminModel({
//         admin_name :"admin",
//         admin_email:"gmail",
//         admin_password:'123'
//     });
//     admin.save();
// }
//------------------------------------------login-----------------------------------------------------------------------------
function adminLogin(req,res) {
    res.render("admin/login")
}
async function Login(req,res) {
    var{email,password}=req.body;
        var account = await AdminModel.findOne({admin_email:email});
          if(account) {
            if(account.admin_email === email && account.admin_password === password){
                req.session.admin_id = account._id;
                res.redirect('/admin/dashboard');
            }
            else{
                res.send("wrong");
            }
          }
          else{
              res.send("wrong")
          }
}
function Logout(req,res){
    req.session.destroy();
     res.redirect("/admin/login");
}
//------------------------------------------------asset-----------------------------------------------------------------------------
 function assetForm(req,res){
    res.render("admin/assetForm");
}
class  insertasset{
    static index = async (req , res)=>{
        try{
            insertasset.find({},function(error,results){
                if(error){
                    console.log('data not fetch');
                }
                else{
                    res.render('home',{data:results})
                }
            })
        }catch (error){
            console.log(error);
        }
    }
    static insert = async(req,res)=>{
        try{
            var asset = new AssetModel({
                Asset_name:req.body.Asset_name,
                Asset_quentity:req.body.Asset_quentity,
                image:req.file.filename
            })
            await asset.save();
            console.log(req.file.filename);
            console.log('data inserted successfully');
        }catch(error){
            console.log(error);
        }
        res.redirect("/admin/dashboard");
    }
    
}
//-----------------------------------------------  course-----------------------------------------------------------------------
    async function courseForm(req,res){
     var teacher = await TeacherModel.find({});
    res.render("admin/courseForm", {'teacher':teacher});
}
function insertcourse(req,res){
    var course = new CourseModel({
        Course_name:req.body.Course_name,
        teacher_id:req.body.teacher_id,
        age_student:req.body.age_student,
        price:req.body.price,
        course_1:req.body.course_1,
        course_2:req.body.course_2,
        course_3:req.body.course_3,
        course_4:req.body.course_4,
        course_5:req.body.course_5,
        course_6:req.body.course_6,
    });
    course.save();
    res.redirect("/admin/course-form");
}
//-----------------------------------------------  course-----------------------------------------------------------------------

//--------------------------------------- class--------------------------------------------------------------------------------
function classForm(req,res){
    res.render("admin/classForm");
}
function insertClass(req,res){
    var Class = new ClassModel({
        class_name:req.body.class_name,
        class_admission_fee:req.body.class_admission_fee,
        class_readmission_fee:req.body.class_readmission_fee,
        class_monthly_fee:req.body.class_monthly_fee,
        class_extera_charges:req.body.class_extera_charges,
        class_books_fee:req.body.class_books_fee,
    });
    Class.save();
    res.redirect("/admin/dashboard");
}
//--------------------------------------- class end--------------------------------------------------------------------------------


//------------------------ edit student-----------------------------------------------------------------------------

async function manageStudent(req,res){
    var studentDetail = await StudentModel.find({status:1}).populate("course_id");
    res.render("admin/manageStudent", {'student': studentDetail});

}
function editApplyStudent(req,res){
    var id=req.params.id;
    StudentModel.find({"_id": id},(error,response)=>{
        
        res.render("admin/editStudent",{'student':response});
    });
}
 function editStudent(req,res){
    var id = req.params.id;
     StudentModel.findByIdAndUpdate({"_id":id},{ status:req.body.status,roll:req.body.roll,},function(err,response){
        return res.redirect("/admin/manage-student");
    })
    console.log(id);
}
//------------------------ edit student end-----------------------------------------------------------------------------

//--------------------------------------------edit Teacher-----------------------------------------------------------------------------
async function manageTeacher(req,res){
    var data = await TeacherModel.find({}).populate("course_id");
    res.render("admin/manageTeacher",{"teacher": data});
    console.log(data);
}
function editApplyTeacher(req,res){
    var id=req.params.id;
    TeacherModel.find({"_id": id},(error,response)=>{
        
        res.render("admin/editTeacher",{'teacher':response});
    });
}
 function editTeacher(req,res){
    var id = req.params.id;
    var data= TeacherModel.findByIdAndUpdate({"_id":id},{ t_salary:req.body.t_salary,t_address:req.body.t_address,course_id:req.body.course_id,}).populate|('course_id');
    var cou = CourseModel.find({});
    return res.redirect("/admin/manage-teacher",{'teacher':data},{'course':cou});
    console.log(id);
}
//--------------------------------------------edit Teacher end-----------------------------------------------------------------------------

// --------------------------------Approve Student------------------------------------------------------

async function NewAdmission(req,res){
    var studentDetail = await StudentModel.find({status:0}).populate("course_id");
    res.render("admin/manageStudent", {'student': studentDetail});
}
async function ApproveStudent(req,res){
    var id = req.params.id;
    var roll = Math.round(Math.random(3) * 100);
    await StudentModel.findOneAndUpdate({"_id":id},{"$set":{'status':1 ,'roll':roll}},{new:true})
    res.redirect("/admin/dashboard");

}
async function DeactiveStudent(req,res){
    var id = req.params.id;
    await StudentModel.findOneAndUpdate({"_id":id},{status:-1},{new:true})
    res.redirect("/admin/dashboard ");
}
function DeleteStudent(req,res){
    var del_id = req.parsms.id;
    StudentModel.remove({"_id":del_id},function(error){
        if(error){
            throw error
        }else{
            res.redirect('/admin/new-admission')
        }
    })
}
// -----------------------------------------------Approve Student End-----------------------------------------------------

// -----------------------------------------------------------payment show-----------------------------------------------------------
async function manadePayment(req,res){
    var data = await MonthlyFeeModel.find({}).populate("student_id").populate('course_id');
    res.render("admin/managePayment",{"MonthlyFee": data});
}
async function monthlyForm(req,res){
    var student = await StudentModel.find({})
    var course = await CourseModel.find({})
    res.render('admin/monthlyForm',{'student':student,'course':course}); 
}

function month_fee(req,res){
    var month_fee = new MonthlyFeeModel({
        student_id:req.body.student_id,
        course_id:req.body.course_id,
        total_amount:req.body.total_amount,  
    });
    month_fee.save();
    res.redirect("/admin/manage-payment");
}
// -----------------------------------------------------------payment show End-----------------------------------------------------------

async function registeredStudent(req,res){
    var data = await StudentModel.find({status:1});
    res.render("admin/registered_student",{"student": data});
}
async function manageStudentData(req,res){
    var id = req.params.id;
    var data = await StudentModel.find({_id:id});
    res.render("admin/manage_student_data",{"student": data});
}  
async function getStudentClass(req,res){
    var id = req.body.class_name;
    var data = await ClassModel.find({class_name:id});
    res.send(data);
}
async function studentPayment(req,res){
    var class_id = req.body.class_id;
    var student_id = req.body.student_id;
    var total_amount = req.body.total_amount;
    var order_id;
    var roll = Math.round(Math.random(3) * 100);
    var order = new OrderModel({
        'student_id': student_id,
        'class_id' : class_id,
        'total_amount' : total_amount
    });
    order.save(function (err, order) { 
        order_id = order._id;
    });
    var studentUpadte = await StudentModel.findOneAndUpdate({_id:student_id},{p_status:1},{roll:roll});
    res.send(order_id);
}   

// -------------------------------------------------------class Room-------------------------------------------------------
async function classManage(req,res){
    var data =await CourseModel.find({});
    res.render('admin/class',{"course":data});
    // console.log(data)
}
async function classRoom(req,res){
    var course_id = req.params.id;
    var data = await StudentModel.find({
        $and:[
            {'course_id':course_id},
            {'status':1}
        ]
    }).populate('course_id');
    res.render("admin/class_room",{'student':data})
    console.log(data)
}
// -------------------------------------------------------class Room END-------------------------------------------------------
// // 
// ----------------------------------------------------------------Email----------------------------------------------------------------

// var transport = nodemailer.createTransport(
//     {
//         service:'gmail',
//         auth:{
//             user:'ayush9334kumar@gmail.com',
//             pass:'#ayush911jhaanshu'
//         }
//     }
// );
// var mailOptions ={
//     from:'ayush9334kumar@gmail.com',
//     to:'rajputankit2103@gmail.com',
//     subject:"Hello world",
//     text:'This is body of email'
// }
// transport.sendMail(mailOptions,function(err, info){
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(info);
//     }
// });

// ----------------------------------------------------------------Email end----------------------------------------------------------------



module.exports = {
    classRoom,
    classManage,
    // studentController,
    month_fee,
    monthlyForm,
    manadePayment,
    adminLogin,
    Login,
    Logout,
    adminDashboard,
    assetForm,
    insertasset,
    classForm,
    insertClass,
    manageStudent,
    editApplyStudent,
    editStudent,
    courseForm,
    insertcourse,
    manageTeacher,
    editApplyTeacher,
    editTeacher,
    NewAdmission,
    ApproveStudent,
    DeactiveStudent,
    DeleteStudent,
    studentPayment,
    getStudentClass,
    manageStudentData,
    registeredStudent,
    // InsertAdmin,
}