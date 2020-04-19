/*Package Imports */
const express = require('express');
const bodyParser = require('body-parser');
//required statement for cors package
const cors = require('cors');
/*Local Imports */
//for database connection we will import db.js module
//here we have use ES6 destructing syntax
//with this import we will establish a connection with mongodb
const { mongoose } = require('./db.js');
//employeeController for router
var employeeController = require('./controllers/employeeController.js');
//to work with express package we have to call the core express
var app = express();
/*now we have to configure express middleware in order to send
json data to this nodejs project */
//for this purpose we will use this line of code
app.use(bodyParser.json());
//to use cors in middleware
app.use(cors({ origin: "http://localhost:4200" }));
//then to start express server we will use
app.listen(3000, () => console.log('Server started at port :3000'));
//now to add the route to our application we will use it in middleware
app.use('/employees', employeeController);