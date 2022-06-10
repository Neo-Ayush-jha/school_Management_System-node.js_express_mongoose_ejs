var mongoose = require('mongoose');
var Student = mongoose.Schema({
    first_name : {type:String,require:true},
    last_name : {type:String,require:true},
    father_name : {type:String,require:true},
    mother_name : {type:String,require:true},
    age : {type:Number,require:true},
    dob : {type:Date,require:true},
    gender : {type:String,require:true},
    roll : {type:String,default:null},
    image :{type:String,default:false},
    mobile : {type:Number,require:true},
    email : {type:String,require:true},
    address : {type:String,require:true},
    date_of_join : {type:Date,default:Date.now('Y-m-d ')},
    password : {type:String,require:true},
    course_id: {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    class_id: {type:mongoose.Schema.Types.ObjectId,ref:"class"},
    paper_1 : {type:Number,default:null},
    paper_2 : {type:Number,default:null},
    paper_3 : {type:Number,default:null},
    paper_4 : {type:Number,default:null},
    paper_5 : {type:Number,default:null},
    paper_6 : {type:Number,default:null},
    status : {type:String,default:0},
    p_status : {type:String,default:0},
    a_status : {type:String,default:0},
});
var StudentModel = mongoose.model("student",Student);
module.exports=StudentModel;
// 1 male                   1. Active student
// 2 female                 0. new student
// 3. other                -1 Old Student
