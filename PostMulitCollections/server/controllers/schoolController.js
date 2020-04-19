const express = require('express');
var router = express.Router();
//to check object id is valid or not
var ObjectId = require('mongoose').Types.ObjectId;

//school model
var {School,StudentModel,CoursesModel,studentSchema,coursesSchema} = require('../models/school.model');

//get function
router.get('/',(req,res)=>{
    StudentModel.find((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in retriving students :'+JSON.stringify(err,undefined,2));
        }
    });
});

//student post route
router.post('/student',async (req,res)=>{
    //we are using console call here to check if it is receving call here
    console.log("call");
    var student = new StudentModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        fathername:req.body.fathername,
        
    });
    try{
  //we are using await because if data is being saved wait here if not then go to other block
   var a=await student.save();
   console.log(a + "kldjl");
    }catch(err){
        console.log(err);
    }
});



router.post('/',async (req,res)=>{
    var ReqArray=req.body;
    studentObj=ReqArray[1];
    courseObj=ReqArray[0];

     try{
        var student = new StudentModel(studentObj);
        student.save((err,doc)=>{
            if(err){
                res.send(doc);
            }
            else{
                console.log('Error in Student Save:' + JSON.stringify(err, undefined, 2));
            }
        });
        
        const findStd = await StudentModel.findOne({_id:courseObj.student});
    
        var course = new CoursesModel();
    
        course.courseName=courseObj.coursename;
    
        course.student=findStd._id;
        //saved courses
        const savedCrs = await course.save((err,doc)=>{
            if(err){
                res.send(doc);
            }
            else{
                console.log('Error in Course Save:' + JSON.stringify(err, undefined, 2));
            }
        });
    
        findStd.courses.push(savedCrs);
        await findStd.save((err,doc)=>{
            if(err){
                res.send(doc);
            }
            else{
                console.log('Error in Student Save:' + JSON.stringify(err, undefined, 2));
            }
        });

     }
     catch(err){
         console.log(err);
     }
});

async function createrecord(req,res){
    console.log(req.body);
    try{
        //student is the name of our filed in our course html page
    //const fi=await StudentModel.findOne({_id:course});
      
    var course= new CoursesModel();
    //courseName this is course name in our schema
    //coursename this is which we have in our course model and using in the course html page as name of input filed
    //course.courseName=req.body.coursename;
      //this student is coming from the courseSchema
    course.student=fi._id;
           
      
      const r = await course.save();
    
     fi.courses.push(r);
     await fi.save(); 

      
    }catch(err){
      console.log(err);
    }
    }

module.exports=router;