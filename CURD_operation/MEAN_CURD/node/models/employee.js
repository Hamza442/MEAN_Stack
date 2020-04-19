const mongoose = require('mongoose');
//now to make the model we will use the following method
//Employee is our model name
//to make model we have to pass the model name in the method
//after this we specifiy the schema/structure of our model
//this model will use the plular word to make the collection name by default
//we can also specify it after },collection name
var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
});
//now we have to export this module
//we are exporting it because when we have to insert we just make object of Employee
//and call the function 
module.exports = { Employee };