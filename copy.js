style="font-family: Handlee, cursive;"
#17a2b8;
font-weight-bold 
00394f
https://tse2.mm.bing.net/th?id=OIP.veQLWaxIFTnvPOdD0pcEkQHaEK&pid=Api&P=0&w=338&h=190




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
                        // foreignField: "course_id",
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
                    t_id                                                                                                                                                                        :'$teachers._id',
                }
                },
                
            ]
        );


            var data = await TeacherModel.aggregate(
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
                        $lookup:{
                            from:"students",
                            localField:"_id",
                            foreignField:"course_id",
                            as:"students",
                        }
                    },
                    {
                        $unwind: "$students",
                    },
                    // { 
                    //     $match: { 
                    //         'courses.teacher_id':'teachers.id',                  
                    //     } 
                    // },
                    {
                    $project: {
                        dob:'$t_name',
                        _id:'$students._id',
    
                        courses_id:'$courses._id',
                        price:'$courses.price',
                        first_name:'$students.first_name',
                        last_name:'$students.last_name',
                        father_name:'$students.father_name',
                        mother_name:'$students.mother_name',
                        gender:'$students.gender',
                        roll:'$students.roll',
                        image:'$students.image',
                        mobile:'$students.mobile',
                        email:'$students.email',
                        address:'$students.address',
                        Course_name:'$courses.Course_name',
                        paper_1:'$students.paper_1',
                        paper_2:'$students.paper_2',
                        paper_3:'$students.paper_3',
                        paper_4:'$students.paper_4',
                        paper_5:'$students.paper_5',
                        paper_6:'$students.paper_6',
                    }
                    },
                    
                ]
            );
            res.render("teacher/manageStudent",{"student": data});
            console.log(data);
        }













class studentController{

  static homePage = async (req,res) =>{
        const user_id = req.user._id;
        const today = new Date();
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; 
        var dd = today.getDate();
        const currentDate = dd +'-'+ mm +'-'+ yyyy
        var Check_Attend = await attendanceModel.findOne({date:currentDate})
        if (Check_Attend !== null) {
            var data = await StudentModel.find({course_id:user_id})
            res.render('admin/dashbord',{
                name:req.user,
                result : data,
                date:currentDate
            })
        } else {
            await StudentModel.updateMany(
                {
                    $or : [ 
                        {"status": -1},
                        {"status": 1}
                    ]       
                },
                {
                    status:0
                }
            )
            var data = await StudentModel.find({course_id:user_id})
            res.render('admin/dashbord',{
                name:req.user,
                result : data,
                date:currentDate
            })
        }
     
    }
    static presentStudent = async (req,res)=>{
        const user_id = req.user._id;
        const today = new Date();
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; 
        var dd = today.getDate();
        const currentDate = dd +'-'+ mm +'-'+ yyyy

        // if(std_id == null){
        //     const student_id = req.params.std_id;
        // }   
        // else {
        //     var student_id = std_id;
        // }
        const student_id = req.params.std_id;
        var data = await attendanceModel.findOne({date:currentDate,course_id:user_id})
        if (data === null) {
            var data = new attendanceModel({
                date:currentDate,
                attendance:[
                    {
                        student_id:student_id,
                        status:'P'
                    }
                ],
                course_id:req.user._id
            })
            await data.save();
            await studentModel.findByIdAndUpdate(student_id,{status:1})
            res.redirect('/admin/attendence')
        } else {
            data.attendance.push({
                student_id:student_id,
                status:'P'
            })
            await data.save();
            await studentModel.findByIdAndUpdate(student_id,{status:1})
            res.redirect('/admin/attendence')
        }
    }
    ////////////////function for absent student
    static absentStudent = async (req,res)=>{
        const user_id = req.user._id;
        const today = new Date();
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; 
        var dd = today.getDate();
        const currentDate = dd +'-'+ mm +'-'+ yyyy

        const student_id = req.params.std_id;
        var data = await attendanceModel.findOne({date:currentDate,course_id:user_id})
        if (data === null) {
            var data = new attendanceModel({
                date:currentDate,
                attendance:[
                    {
                        student_id:student_id,
                        status:"A"
                    }
                ],
                course_id:req.user._id
            })
            await data.save();
            await studentModel.findByIdAndUpdate(student_id,{status:-1})
            res.redirect('/admin/attendence')
        } else {
            data.attendance.push({
                student_id:student_id,
                status:'A'
            })
            await data.save();
            await studentModel.findByIdAndUpdate(student_id,{status:-1})
            res.redirect('/admin/attendence')
        }
    }

    static checkRecord =async (req,res)=>{
        
        const attendance_data = await attendanceModel.find({course_id:req.user._id}).populate('attendance.student_id')
        console.log(typeof(attendance_data));
        if (attendance_data == '') {
            res.render('attendanceRecord',{
                name:req.user,
                message:"No Records founds till Date"

            })
        }
        else{
            res.render('attendanceRecord',{
                name:req.user,
                result:attendance_data,
            })
        }
   
    }

    static addStudent = (req,res)=>{
        res.render('attendanceByRf');
    }

    static Rf_reader =async (req,res)=>{

        const user_id = req.user._id;
        const today = new Date();
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; 
        var dd = today.getDate();
        const currentDate = dd +'-'+ mm +'-'+ yyyy


        const student  = await studentModel.findOne({reader_id:req.body.rf_id})

        const student_id = student._id;

        // this.presentStudent(req,res,student_id);


        var data = await attendanceModel.findOne({date:currentDate,course_id:user_id})
        if (data === null) {
            var data = new attendanceModel({
                date:currentDate,
                attendance:[
                    {
                        student_id:student_id,
                        status:'P'
                    }
                ],
                course_id:req.user._id
            })
            await data.save();
            await studentModel.findByIdAndUpdate(student_id,{status:1})
            res.redirect('/admin/attendence')
        } else {
            data.attendance.push({
                student_id:student_id,
                status:'P'
            })
            await data.save();
            await studentModel.findByIdAndUpdate(student_id,{status:1})
            res.redirect('/admin/attendence')
        }
        
    }
}










{
    $lookup:{
        from:"courses",
        as:'courses',
        let:{course_id:'$_id'},
        pipeline:[
            {
                $match:{
                    $expr:{
                        $eq:['$course_id','$$course_id']
                    }
                }
            }
        ]
    },
},
{
        $unwind: "$courses",
    },