const session = require("express-session");
const CourseModel = require("../models/CourseModel");
const TeacherModel = require("../models/TeacherModel");
const StudentModel = require("../models/StudentModel");
const NotificationModel = require("../models/NotificationModel");
const TeacherSalaryModel = require("../models/TeacherSalary");
const moment = require("moment");
const { response } = require("express");
const studentsAttendanceModel = require("../models/attendanceModel");

function teacherLogin(req,res) {
    res.render("teacher/login",)
}
async function teacherLoginCheck(req,res) {
    var{email,password}=req.body;
      
        var account = await TeacherModel.findOne({t_email:email});
          if(account) {
            if(account.t_email === email && account.t_password === password){
                req.session.teacher_id = account._id;
                res.redirect('/teacher/dashboard');
            }
            else{
                res.send("wrong");
            }
          }
          else{
              res.send("wrong email")
          }
}
 async function teacherDashboard(req,res) {
     TeachersessionId = req.session.teacher_id;
     var data = await TeacherModel.find({_id:TeachersessionId});
     res.render("teacher/dashboard",{"teacher": data});
    //  var teacherDetail =  await TeacherModel.find({_id:TeachersessionId});
    //  res.render("teacher/dashboard",{"teacher": data},{"teacherDetail":teacherDetail});
 }

function teacherForm(req,res){
    var data = CourseModel.find({},(error,response)=>{
        res.render("teacher/teacherForm", {"course":response});
    })
}
function insertTeacher(req,res){
    var teacher = new TeacherModel({
        t_name:req.body.t_name,
        t_age:req.body.t_age,
        t_mobile:req.body.t_mobile,
        t_salary:req.body.t_salary,
        t_address:req.body.t_address,
        t_email:req.body.t_email,
        t_specilization:req.body.t_specilization,
        course_id:req.body.course_id,
        t_dob:req.body.t_dob,
        t_gender:req.body.t_gender,
        t_password:req.body.t_password,
    });
    teacher.save();
    console.log(req.body.course_id)
    res.redirect("/teacher/dashboard");
}

// ---------------------------notification---------------------------------------
async function notification(req,res){
    TeachersessionId = req.session.teacher_id;
    var data = await NotificationModel.find({ 'teacher_id': TeachersessionId}).populate("teacher_id");
    res.render("teacher/notification",{"notification": data});
    console.log(data)
}
function notificationForm(req,res){
    TeachersessionId = req.session.teacher_id;
    var data = TeacherModel.find({'teacher_id': TeachersessionId},(error,response)=>{
        res.render("teacher/notificationForm", {"teacher":response});
    })
    // res.render("admin/notificationForm");
}
function insertNotification(req,res){
    // TeachersessionId = req.session.teacher_id;
    var notification = new NotificationModel({
        teacher_id:req.body.teacher_id,
        // TeachersessionId:TeachersessionId ,
        notice:req.body.notice,
        date:new Date(),
    });
    notification.save();
    res.redirect('/teacher/notification');
}

// ---------------------------End-notification---------------------------------------

// ------------------------------report----------------------------------------
    
async function manageStudents(req,res){
        var id= req.session.teacher_id;
        console.log(id);
        // var teacher = await TeacherModel.findById(id);
    var data = await StudentModel.aggregate(
        [
            
            {
                $lookup:{
                    from:"courses",
                    localField:"course_id",
                    foreignField:"_id",
                    as:"courses",
                }
            },
            {
                $unwind: "$courses",
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "teacher_id",
                    foreignField: "course_id",
                    // foreignField: "_id",
                    foreignField: "id",
                    as: "teachers",
                }
            },
            {
                $unwind: "$teachers",
            },            
            {
            $project: {
                dob:'$teachers.t_name',
                first_name:'$first_name',
                last_name:'$last_name',
                father_name:'$father_name',
                mother_name:'$mother_name',
                gender:'$gender',
                roll:'$roll',
                image:'$image',
                mobile:'$mobile',
                email:'$email',
                address:'$address',
                Course_name:'$courses.Course_name',
                teacher_id:'$courses.teacher_id',
                paper_1:'$paper_1',
                paper_2:'$paper_2',
                paper_3:'$paper_3',
                paper_4:'$paper_4',
                paper_5:'$paper_5',
                paper_6:'$paper_6',
                t_id:'$teachers._id',
            }
        },
        
    ]
);

console.log(data);

data = data.filter((item) => (item.t_id == id && item.teacher_id == id))

res.render("teacher/manageStudent",{"student": data});
}
    async function editApplyStudents(req,res){
        var id=req.params.id;
        // StudentModel.find({"_id": id},(error,response)=>{
            
        //     res.render("teacher/students_reportcard",{'students':response});
        // });
        var data = await StudentModel.find({"_id": id}).populate("course_id");
        res.render("teacher/student_reportcard",{"students": data});
        console.log(data);
        // res.redirect("/admin/manageStudent");
        
    }
    function editStudents(req,res){
        var id = req.params.id;
        StudentModel.findByIdAndUpdate({"_id":id},{ status:req.body.status,roll:req.body.roll,paper_1:req.body.paper_1,paper_2:req.body.paper_2,paper_3:req.body.paper_3,paper_4:req.body.paper_4,paper_5:req.body.paper_5,paper_6:req.body.paper_6,},function(err,response){
            return res.redirect("/teacher/manage-students",{"students": StudentModel});
        })
        console.log(id);
    }
// ------------------------------end--report----------------------------------------

// async function manageTeaches(req,res){
//     var data = await TeacherModel.find({}).populate("course_id");
//     res.render("admin/manageTeacher",{"teacher": data});
//     console.log(data);
// }

// ----------------------------------Teacher salary------------------------------------------------

async function manageTeacherSalary(req,res){
    var t_id =    req.session.teacher_id;
    tSalary = await TeacherSalaryModel.find({teacher_id:t_id});
    console.log(tSalary);
    res.render("admin/teacher_salary",{'teacher_salary':tSalary})
}
async function generateTeacherSalary(req,res){
    var log = req.session.teacher_id;
    tSalary = await TeacherModel.find({_id:log});
    doj = tSalary[0].doj;

    currentDate = new Date();
    CurrYear =currentDate.getFullYear();
    currMonth=currentDate.getMonth() + 1;
    currDate = currentDate.getDate();

    dateOfJoin = new Date(doj)
    dojYear = dateOfJoin.getFullYear();
    dojMonth = dateOfJoin.getMonth() + 1;
    dojDate = dateOfJoin.getDate();

    diffMonth = moment([CurrYear,currMonth,currDate]).diff(moment([dojYear,dojMonth,dojDate]),"months")

    var counterMonth = dojMonth;
    var countterYear = dojYear;
        for(i=0;i<diffMonth;i++){
            var checkPaymentRecord = await TeacherSalaryModel.exists({
                teacher_id:log,
                month:counterMonth,
                year:countterYear,
            }).then((exist)=>{
                if(exist){
                    // 
                }
                else{
                    TeacherSalaryModel.create({
                        teacher_id:log,
                        month:counterMonth,
                        year:countterYear,
                        dop:currentDate,
                        amount:tSalary[0].t_salary,
                        doj:doj,
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
        console.log(doj);
        console.log(tSalary);
}
async function manageSalary(req,res){
    await generateTeacherSalary(req,res);
    TeachersessionId = req.session.teacher_id;
    var data = await TeacherSalaryModel.find({ 'teacher_id': TeachersessionId}).populate("teacher_id");
    console.log(data)
    res.render("admin/salary_teacher",{'teacher_salary':data,'teacher':TeachersessionId});
}
// ----------------------------------Teacher salaryend------------------------------------------------



// -------------------------------------------------Attendence-------------------------------------------------
// 
async function studentsController(req,res){
    var t_id = req.params.id;
    const today = new Date();
    const yyyy = today.getFullYear();
    var mm = today.getMonth() + 1 ;
    var dd = today.getDate();
    const currentDate = dd +'-'+ mm +'-'+ yyyy;
    var Check_Attend = await studentsAttendanceModel.findOne({date:currentDate})
    if (Check_Attend !== null){
        var date = await StudentModel.find({course_id:t_id});
        res.render('teacher/dashboard',{
            name : req.teacher,
            result:date,
            date:currentDate
        })
    }else{
        await StudentModel.updateMany(
            {
                $or:[
                    {'a_status':-1},
                    {'a_status':1}
                ]
            },
            {
                a_status:0
            }
        )
        var date = await StudentModel.find({course_id:t_id})
            res.render('teacher/dashboard',{
                name:req.teacher,
                result:date,
                date:currentDate
            })
    }
}
async function paresentStudent(req,res){
        var t_id = req.params.id;
        const today = new Date();
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        const currentDate = dd +'-'+ mm +'-'+ yyyy;
        const students_id = req.params.students_id;
        var data = await studentsAttendanceModel.findOne({
            date:currentDate,
            course_id:t_id
        })
        if(data === null){ 
                var data = new studentsAttendanceModel({
                date:currentDate,
                attendence:[
                    {
                        students_id:students_id,
                        a_status:'P'
                    }
                ],
                course_id:req.teacher._id,
            })
            await data.save();
            await StudentModel.findByIdAndUpdate(students_id,{status:1})
            res.redirect('/teacher/attendence')
        }else{
            data.attendance.push({
                students_id:students_id,
                a_status:'P'
            })
            await data.save();
            await StudentModel.findByIdAndUpdate(students_id,{status:1})
            res.redirect('/teacher/attendence')
        }
}
async function absentStudent(req,res){
    var t_id = req.params.id;
    const today = new Date();
    const yyyy = today.getFullYear();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    const currentDate= dd +'-'+ mm +'-'+ yyyy;
    const students_id = req.params.students_id;
    var date = await studentsAttendanceModel.findOne({date:currentDate, course_id:user_id})
    if(data === null){
        var data = new studentsAttendanceModel({
            date:currentDate,
            attendance:[
                {
                    students_id:students_id,
                    a_status:"A"
                }
            ],
            course_id:req.teacher._id
        })
        await date.save();
        await StudentModel.findByIdAndUpdate(students_id,{a_status:-1})
        res.redirect('/teacher/attendence')
    }else{
        data.attendance.push({
            students_id:students_id,
            a_status:'A'
        })
        await data.save();
        await StudentModel.findByIdAndUpdate(students_id,{a_status:-1})
        res.redirect('/admin/attendence')
    }
}
async function checkRecord(req,res){
    const attendance_data= await studentsAttendanceModel.find({course_id:req.teacher._id}).populate('attendance.students_id');
    console.log(typeof(attendance_data));
    if(attendance_data == ''){
        res.render('attendanceRecord',{
            name:req.teacher,
            message:'No Record Founds till Date'
        })
    }
    else{
        res.render('attendanceRecord',{
            name:req.user,
            result:attendance_data,
        })
    }
}
// -------------------------------------------------Attendence END-------------------------------------------------
module.exports = {
// =======>   attendence
    studentsController,
    paresentStudent,
    absentStudent,
    checkRecord,
// ----------->  end attendence
    teacherLogin,
    teacherLoginCheck,
    teacherDashboard,
    insertTeacher,
    teacherForm,
    // manageTeaches,
    manageStudents,
    editStudents,
    editApplyStudents,
    notification,
    insertNotification,
    notificationForm,

    manageSalary,
    manageTeacherSalary,
}