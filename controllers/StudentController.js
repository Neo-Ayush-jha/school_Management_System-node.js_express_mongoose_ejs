const session = require("express-session");
const CourseModel = require("../models/CourseModel");
const StudentModel = require("../models/StudentModel");
const PaymentModel = require("../models/PaymentModel");
const OrderModel = require("../models/Order_model");
const OrderDataModel = require("../models/Order_data_model");
const MonthlyFeeModel = require("../models/MonthlyFee");
const schedule = require('node-schedule');
const AttendenceModel =  require("../models/attendanceModel");
const NotificationModel = require("../models/NotificationModel");
var moment = require("moment");
const { connect } = require("../router/router");

function studentLogin(req, res) {
    res.render("student/login")
}
function LogoutStudent(req,res){
    req.session.destroy();
     res.redirect("/student/login");
}
async function studentLoginCheck(req, res) {
    var {email,password} = req.body;
    console.log(email);
    console.log(password);
    var account = await StudentModel.findOne({email: email});
    console.log(account)
    if (account.email === email && account.password === password) {
        req.session.student_id = account._id;
        res.redirect('/student/dashboard');
    } else {
        res.send("wrong");
    }
}
async function studentDashboard(req, res) {
    StudentsessionId = req.session.student_id;
    var studentDetail = await StudentModel.find({ '_id': StudentsessionId});
    res.render("student/dashboard", {"student": studentDetail});
   
}
function applyform(req,res) {
    var data = CourseModel.find({},(error,response)=>{
        res.render("student/applyform",{"course":response})
    })
}

    class  applyStudent{
        static insert = async(req,res)=>{
            try{
                var student = new StudentModel({
                    image:req.file.filename,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    father_name:req.body.father_name,
                    mother_name:req.body.mother_name,
                    age:req.body.age,
                    dob:req.body.dob,
                    gender:req.body.gender,
                    roll:req.body.roll,
                    class:req.body.class,
                    mobile:req.body.mobile,
                    email:req.body.email,
                    course_id:req.body.course_id,
                    address:req.body.address,
                    password:req.body.password,
                })
                await student.save();
                console.log(req.file.filename);
                console.log('data inserted successfully');
            }catch(error){
                console.log(error);
            }
            res.redirect("/student/applyform");
        }
        
    }
// =======================================================================landin page of student==================================================

const today = new Date();
var todays_date = today.getDate();
var todays_day = today.getDay();
var month_name = today.getMonth();
var year_name = today.getFullYear();
var todays_time = today.getTime();
var date_update = moment(new Date()).format("DD-MM-YYYY");

async function studentAttendence(req,res){
    var student_id=req.body.student_id;
    var todays_attendence=await AttendenceModel.findOneAndUpdate({
        $and:[
            {student_id : student_id},
            {date:date_update}
        ],
    },{a_status:'1'}).then(function(err,data){
        if(!err){
            res.send("student attendence is update")
            console.log(data)
        }
        else{
            res.send(err)
            console.log(err)
        }
    });
  }


  async function generateStudentAttendene () {
    var student = await StudentModel.find({status:1});
    const allStudent = student.forEach(async (element) => {
        var daily_attendence = AttendenceModel({
             'student_id':element._id,
             'date' : date_update,
             'day_name': todays_day,
             'month_name': month_name,
             'year_name': year_name,
             'time':todays_time,
             'a_status':0,
         });
         daily_attendence.save();
    });
    
    console.log("hello")
    console.log(daily_attendence);
}

// const job = schedule.scheduleJob('*/2 * * * * * ', async function(){
    const job = schedule.scheduleJob('0 0 * * *', async function(){
         generateStudentAttendene();
        
         console.log(moment(new Date()).format("DD-MM-YYYY"))
});


// =======================================================================landin page of student==================================================
async function ragristration(req,res) {
    var data =await CourseModel.find({});
    res.render("student/landinPage",{"course":data});
}
async function ragristration_for_class(req,res) {
    var data =await CourseModel.find({});
    res.render("student/class",{"course":data});
}
function ragristration_class(req,res){
    var student = new StudentModel({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        father_name:req.body.father_name,
        mother_name:req.body.mother_name,
        age:req.body.age,
        dob:req.body.dob,
        gender:req.body.gender,
        roll:req.body.roll,
        class:req.body.class,
        mobile:req.body.mobile,
        image:req.body.image,
        email:req.body.email,
        course_id:req.body.course_id,
        address:req.body.address,
        password:req.body.password,
    });
    student.save();
    console.log(req.body.course_id)
    res.redirect('/school');
    // console.log(applyStudent);
}
     
    class  registerStudent{
        static insert = async(req,res)=>{
            try{
                var student = new StudentModel({
                    image:req.file.filename,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    father_name:req.body.father_name,
                    mother_name:req.body.mother_name,
                    age:req.body.age,
                    dob:req.body.dob,
                    gender:req.body.gender,
                    roll:req.body.roll,
                    class:req.body.class,
                    mobile:req.body.mobile,
                    email:req.body.email,
                    course_id:req.body.course_id,
                    address:req.body.address,
                    password:req.body.password,
                })
                await student.save();
                console.log(req.file.filename);
                console.log('data inserted successfully');
            }catch(error){
                console.log(error);
            }
            res.redirect("/school");
        }
    }
 // ===============================================landin page of student End====================================================================
// ----------------------------------------payment_monthaly--------------------------/
async function getUser(req){
     std= await StudentModel.findById(req.session.student_id);
     return std;
}
async function manageStudentSalary(req,res){
    var std =    req.session.student_id;
    stuedntFee = await MonthlyFeeModel.find({student_id:std});
    console.log(stuedntFee);
    res.render("admin/manage_student_fee_monthly",{'MonthlyFee':stuedntFee})
}
async function generatePayment(req,res){
    var log =    req.session.student_id;
    studentPayment = await StudentModel.find({studentId:log}).populate("course_id");
    console.log(studentPayment);
    date_of_join = studentPayment[0].date_of_join;
     console.log(date_of_join)
     currentDate = new Date();
        CurrYear =currentDate.getFullYear();
        currMonth=currentDate.getMonth() + 1;
        currDate = currentDate.getDate();

        dateOfJoin = new Date(date_of_join)
        date_of_joinYear = dateOfJoin.getFullYear();
        date_of_joinMonth = dateOfJoin.getMonth() + 1;
        date_of_joinDate = dateOfJoin.getDate();

        diffMonth = moment([CurrYear,currMonth,currDate]).diff(moment([date_of_joinYear,date_of_joinMonth,date_of_joinDate]),"months")
        var monthly_fee = req.body.monthly_fee;
        var counterMonth = date_of_joinMonth;
        var countterYear = date_of_joinYear;
        for(i=0;i<diffMonth;i++){
            var checkPaymentRecord = await MonthlyFeeModel.exists({
                student_id:log,
                course_id:log,
                month:counterMonth,
                year:countterYear,
            }).then((exist)=>{
                if(exist){
                    // 
                }
                else{
                    MonthlyFeeModel.create({
                        student_id:log,
                        course_id:studentPayment[0].course_id,
                        month:counterMonth,
                        year:countterYear,
                        dop:currentDate,
                        monthly_fee:monthly_fee,
                        total_amount:studentPayment[0].course_id.price,
                        date_of_join:date_of_join,
                    })
                }
            })
            if(counterMonth>11){
                counterMonth /=12;
                countterYear++;
            }
            else{
                counterMonth++;
            }
        }
        console.log(currentDate);
        console.log(counterMonth);
}    
async function manageStudentPayment(req,res){
    await generatePayment(req,res);
    std = req.session.student_id;
    studentPayment = await MonthlyFeeModel.find({'student_id':std}).populate("course_id").populate("student_id")
    res.render("admin/manage_student_fee_monthly",{'MonthlyFee':studentPayment,"student":std});
}
async function monthlyFee(req, res) {
    var student_id = req.session.student_id;
    var data = await MonthlyFeeModel.find({$and:[{student_id:student_id}]}).sort({status:0}).populate('student_id');
    // console.log(JSON.stringify(data.student_id));
    res.render('student/student_payment',{"student_fees":data});
}
async function monthlyFeePayment(req, res){
        var class_id = req.body.class_id;
        var student_id = req.body.student_id;
        var total_amount = req.body.total_amount;
        var order_id;
        // var date_update = Date.now();
        var order = new OrderDataModel({
            'student_id': student_id,
            'class_id' : class_id,
            'total_amount' : total_amount
        });
        order.save(function (err, order) { 
            order_id = order._id;
        });
        var studentUpadte = await MonthlyFeeModel.findByIdAndUpdate({_id:student_id},{p_status:1});
        console.log(studentUpadte)
        res.send(order_id);
       
    }   
async function singleView(req,res){
    StudentsessionId = req.session.student_id;
    var studentDetail = await MonthlyFeeModel.find({ 'student_id': StudentsessionId}).populate("student_id").populate("course_id");
    res.render("student/single_view", {"MonthlyFee": studentDetail});
}
// =================================-payment_monthaly End-======================================================


async function studentResult(req,res){
    StudentsessionId = req.session.student_id;
    var studentDetail = await StudentModel.find({ '_id': StudentsessionId}).populate("course_id");
    res.render("student/result", {"studentDetail": studentDetail});
}
async function notice(req,res){
    StudentsessionId = req.session.student_id;
    var studentDetail = await NotificationModel.find().populate("teacher_id");
    res.render("student/notice",{"notification": studentDetail});
    console.log(studentDetail)
}



 
module.exports = {
    monthlyFee,
    monthlyFeePayment,
    studentLogin,
    studentLoginCheck,
    studentDashboard,
    applyStudent,
    applyform,
    manageStudentPayment,
    manageStudentSalary,
    LogoutStudent,
    singleView,
    notice,
    ragristration,
    registerStudent,
    ragristration_for_class,
    ragristration_class,
    studentResult,
    studentAttendence,
    // addPayment,
    // requstPayment,

}