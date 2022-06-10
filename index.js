var express =require('express')
var app = express()
var router = require('./router/router');
var bodyParser = require('body-parser');
var connect = require('./db');
var session = require("express-session");
var flash = require("express-flash")
var ejs = require("ejs");
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
const schedule = require('node-schedule');
var nodemailer = require('nodemailer');
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



// require("express-dynamic-helpers-patch")(app)
// connect
// app.dynamicHelpers({
//     admin:function(req,res){
//         return req.session;
//     }
// })

app.use(flash());
app.use(express.json());
app.use(session({
    secret:"123456789897745",
    resave:true,
    saveUninitialized:false,
}));

var urlEncoded = bodyParser.urlencoded({extended:false})
app.use(urlEncoded);



app.use("/images",express.static(path.join(__dirname,"images")));
const staticPath = path.join(__dirname,'./images');
app.use(express.static(staticPath))

app.use("/",router);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine","ejs")
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(require('ejs-yield'));
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log('hii student');
});