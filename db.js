var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/schoolManagementSystem', function(error){
    if(error){
        console.log("non-connected");
    }
    else{
        console.log("connected");
    }
})

module.exports = mongoose;