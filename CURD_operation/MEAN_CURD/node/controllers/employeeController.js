//in this controller we implement router from express
const express = require('express');
var router = express.Router();
//to make sure that id is a valid mongodb id we will use this module
var ObjectId = require('mongoose').Types.ObjectId;

//we also have to work with employee model 
var { Employee } = require('../models/employee');

/*when we navigate to root then we this will give us back all the 
employees using the function
to access this method we use
=> localhost:3000/employees/ */
router.get('/', (req, res) => {
    //this function will find out all the employees from the collection
    Employee.find((err, docs) => {
        /*if we dont have any error then we have to return this
        document or collection */
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));
        }
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////
//this get request for one specific employee
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Retriving Employee:' + JSON.stringify(err, undefined, 2));
        }
    });

});
////////////////////////////////////////////////////////////////////////////////////////////////////
/*For Post request
we will send json data from this post request
in order to retrive name property we use this req.body.name
here we have can also say that we have created mongoose model  */
router.post('/', (req, res) => {
    //object of Employee model class
    var emp = new Employee({
        //here we are filling details from request body
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    //to save the record we use
    //after saving record we use callback function
    //also check for error
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee Save:' + JSON.stringify(err, undefined, 2));
        }
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
//this function is for update
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }
    //after checking for id we will make a object for update
    //during update we will send new json data for update
    //it is not an object of Emolyee model just a normal object
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    //first parametr is the id that we have received from url
    //second paramter tells to update value in mongodb
    /*with this new parameter it tells the monogdb if we want
    get all the data of mongodb or the updated data back to response
    new = true means that the doc will have the updated values */
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2));
        }
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//for delete operation
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2));
        }
    });
});
//we have to configure the routes indexx file , we export it
module.exports = router; 