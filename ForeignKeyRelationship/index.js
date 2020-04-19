const express=require('express');
const app= express();
const mongoose= require('mongoose');
const bodyparser= require('body-parser');
const hbs=require('express-handlebars');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set('views','./views');
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'mainlayout',layoutsDir:'./views/layouts/'}))
app.use(express.static('./views'));

mongoose.connect('mongodb://localhost:27017/parent',{useNewUrlParser: true}); 
var Schema=mongoose.Schema;

//For signup


//for employee

const parent=new Schema({
    fname: {type: String},
    lname: {type: String},
    child:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
      }]
  
});

const parentModel = mongoose.model('studentp',parent);

app.get('/',(req,res)=>{
    res.render('student');

})

app.post('/student',(req,res)=>{
        var data = new parentModel({
            fname:req.body.fname,
            lname:req.body.lname,
           
        });
                data.save((err,dat)=>{
                    if(err)throw err;
               console.log(dat);
               
               });
           
    
});




const child=new Schema({
    name: {type: String},
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'studentp'
      }
});
const childModel = mongoose.model('course',child);
app.get('/course' , function(req ,res){
    parentModel.find({}).then((value) =>{
        console.log(value);
        res.render('course',{user:value});
    })
});
app.post('/course',(req,res)=>{
    console.log(req.body)
    createrecord(req,res);
    //    var data = new childModel({
      //      name:req.body.name,
           
   //     });
     //           data.save((err,dat)=>{
       //             if(err)throw err;
         //      console.log(dat);
               
           //    });
            
            
});
async function createrecord(req,res){
    try{
    const fi=await parentModel.findOne({_id:req.body.select});
      
    var child= new childModel();

    child.name=req.body.name;
      
    child.parent=fi._id;
           
      
      const r = await child.save();
    
     fi.child.push(r);
     await fi.save(); 
      
    }catch(err){
      console.log(err);
    }
    }


app.listen(8000,()=>{
    console.log('Run on port');
});