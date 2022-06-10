var express = require('express');
const { adminLogin, Login, adminDashboard, insertasset, assetForm, classForm, insertClass, manageStudent, editApplyStudent, editStudent, insertcourse, courseForm, editTeacher, manageTeacher, editApplyTeacher, NewAdmission, ApproveStudent,manadePayment, DeactiveStudent, registeredStudent, manageStudentData, getStudentClass, studentPayment, Logout, monthlyForm, month_fee, classRoom, classManage,  } = require('../controllers/AdminController');

const { studentLogin, studentLoginCheck, studentDashboard,LogoutStudent, applyStudent, applyform, singleView, notice, ragristration, registerStudent, ragristration_for_class, studentResult, manageStudentPayment, manageStudentSalary, studentAttendence, monthlyFeePayment, monthlyFee,  } = require('../controllers/StudentController');

const { teacherLogin, teacherLoginCheck, teacherDashboard, teacherForm, insertTeacher, manageStudents, editStudents, editApplyStudents, notification, insertNotification, notificationForm, paresentStudent, absentStudent, checkRecord, manageTeacherSalary, manageSalary } = require('../controllers/TeacherController');

const {adminAuthorized, adminAuthorizedCheck} = require('../middleware/AdminMiddleware');
const {studentAuthorized, studentAuthorizedCheck} = require('../middleware/StudentMiddleware');
const { teacherAuthorizedCheck, teacherAuthorized } = require('../middleware/TeacherMiddleWare');
const upload = require("../middleware/upload")
var router = express.Router();

// Admin Route start here
router.get('/admin/login', adminAuthorizedCheck, adminLogin);
router.post('/admin/login',Login);
router.post("/logout",Logout);
// router.get("/InsertAdmin",InsertAdmin);
router.get('/admin/dashboard',adminAuthorized,adminDashboard);
// ---------------------------------------Attendence----------------------------------
// router.get("/admin/attendence",studentController);
// router.post("/admin/attendence",studentController);
// ---------------------------------------Attendence----------------------------------
router.get('/admin/asset-form',adminAuthorized,assetForm);
router.post('/admin/asset-form',adminAuthorized,upload.single('image'),insertasset.insert);
router.get('/admin/class-form',adminAuthorized,classForm);
router.post('/admin/class-form',adminAuthorized,insertClass);
router.get('/admin/course-form',adminAuthorized,courseForm);
router.post('/admin/course-form',adminAuthorized,insertcourse);

router.get("/admin/class",classManage);
router.get('/class_room/:id',classRoom);
// -------------------------------student Admin----------------------------------------------------------
router.get('/admin/manage-student',adminAuthorized,manageStudent);
router.post('/admin/edit-student/:id',adminAuthorized,editStudent);
router.get('/admin/edit-student/:id',adminAuthorized,editApplyStudent);

router.get('/admin/register/student',adminAuthorized, registeredStudent );
router.get('/admin/student/edit/:id', adminAuthorized, manageStudentData );
router.post('/admin/student/class', adminAuthorized, getStudentClass );
router.post('/admin/student/payement', adminAuthorized, studentPayment );


router.get("/admin/new-admission",adminAuthorized ,NewAdmission);
router.get("/admin/approve-student/:id",adminAuthorized ,ApproveStudent);
router.get("/admin/Pass-out-student/:id",adminAuthorized ,DeactiveStudent);

router.get('/admin/monthly-form',adminAuthorized,monthlyForm);
router.post('/admin/monthly-form',adminAuthorized,month_fee);
router.get('/admin/manage-payment',adminAuthorized,manadePayment);

// -------------------------------------------teacher Admin-----------------------------------------------------------------------------------
router.post('/admin/edit-teacher/:id',editTeacher);
router.get('/admin/manage-teacher',adminAuthorized,manageTeacher);
router.get('/admin/edit-teacher/:id',editApplyTeacher);



// +++++++++++++++++++++++++++Student Route start here+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get('/student/login', studentAuthorizedCheck, studentLogin);
router.post('/student/login', studentLoginCheck);
router.get('/student/dashboard', studentAuthorized, studentDashboard);
router.post("/student/logout",LogoutStudent);
router.get('/student/notification',studentAuthorized  , notice);

// router.get("/student/course/manage",studentAuthorized,manageStudentClass);------>>>>*****+****>>>>important find----------->
router.get("/student/applyform",applyform);
router.get("/school",ragristration);
router.post("/student/applyform",upload.single('image'),applyStudent.insert);
router.post("/school",upload.single('image'),registerStudent.insert);
router.post("/class",upload.single("image"),ragristration_for_class);
router.get("/class",ragristration_for_class);

router.get("/student/single-view",studentAuthorized,singleView);
router.get("/student/single-result",studentAuthorized,studentResult);

// router.post("/student/payment/add",addPayment);
// router.post("/student/payment/add",addPayment);


//+++++++++++++++++++++++++++ teacher Route start here+++++++++++++++++++++++++++

router.get('/teacher/login', teacherAuthorizedCheck, teacherLogin);
router.post('/teacher/login', teacherLoginCheck);
router.get('/teacher/dashboard', teacherAuthorized, teacherDashboard);

router.get('/teacher/notification',teacherAuthorized, notification);
router.get('/teacher/notificationForm',teacherAuthorized, notificationForm);
router.post('/teacher/notificationForm',teacherAuthorized, insertNotification);
// router.get('/teacher/dashboard', teacherAuthorized, manageTeaches);
router.get('/teacher/teacher-form',teacherForm);
router.post('/teacher/teacher-form',  insertTeacher);
router.get('/teacher/manage-student',teacherAuthorized,manageStudents);
router.post('/teacher/edit-student/:id',teacherAuthorized,editStudents);
router.get('/teacher/edit-student/:id',teacherAuthorized,editApplyStudents);

router.get("/teacher/payment/manage/:p_id/request",manageTeacherSalary);
router.get("/teacher/payment",teacherAuthorized,manageSalary);

router.get('/present/:std_id',teacherAuthorized,paresentStudent);
router.get('/absent/:std_id',teacherAuthorized,absentStudent);
router.get('/checkrecord',teacherAuthorized,checkRecord);




// extra
router.get('/',function(req,res){
    res.render('admin/layout/app');
});
router.get('/data',function(req,res){
    res.render('admin/manage_student_data');
});
router.get('/admin/invoice',function(req,res){
    res.render('admin/invoice');
});
router.get('/base',function(req,res){
    res.render('admin/base');
});
router.get('/rcp',function(req,res){
    res.render('teacher/student_reportcard');
});
router.get('/school',function(req,res){
    res.render('student/landinPage');
});
router.get('/gallery',function(req,res){
    res.render('student/gallery');
});
router.get('/about',function(req,res){
    res.render('student/about');
});
router.get('/teacher',function(req,res){
    res.render('student/teacher');
});



router.post('/student/dashboard',studentAttendence);


router.get("/student/payment/manage/:p_id/request",manageStudentSalary);
router.get("/student/payment",studentAuthorized,manageStudentPayment);
router.get('/student/monthly/fee', studentAuthorized, monthlyFee);

router.post('/student/monthly/payment', studentAuthorized, monthlyFeePayment );

module.exports = router;