const multer = require('multer')


// image connect ---------------------------------------
const fileStorage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_"+Date.now() + "_" + file.originalname);
    }
});
const upload = multer({
    storage:fileStorage,
    fileDilter:(req,file,cb)=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            console.log('image is inserted');
            cd(null, true);
        }else{
            cd(null, false);
            console.log('image not inserted');
            return cd(new Error('Only .png.jpg and .jpeg formate allowed'));
        }
    }
});
module.exports = upload;