const mongoose = require('mongoose');

//StudentSchema
var studentSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    fathername:{
        type:String
    },
    courses:[{
        //to get all the objects ids
        type:mongoose.Schema.Types.ObjectId,
        //collection name of child
        ref:'Courses'
    }]
});
//first parameter is Model name
//second parameter is schema name
const StudentModel = mongoose.model('StudentModel',studentSchema,'students');

//course schema
const coursesSchema = new mongoose.Schema({
    courseName:{
        type:String
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students'
    }
});

const CoursesModel = mongoose.model('CoursesModel',coursesSchema,'courses');
module.exports={StudentModel,CoursesModel,studentSchema}