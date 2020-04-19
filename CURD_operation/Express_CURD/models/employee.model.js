//this file has schema or structure of mongo db
const mongoose = require('mongoose');

//employeeSchema is the object for schema
//{} in this we specify the structure of employee document
var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //this fuction is called to check the correctness
    return emailRegex.test(val);
}, 'Invalid e-mail.');
//Employee is the name of our schema
//employeeSchema is the name of our object
//to register this shcema inside mongoose we are using mongoose.model
mongoose.model('Employee', employeeSchema);