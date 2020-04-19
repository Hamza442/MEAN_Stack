//this is our root file
//this require statement is added for db.js file
require('./models/db');

const express = require('express');
//Node.js path module is used for handling and transforming file paths.
const path = require('path');
const exphbs = require('express-handlebars');
//binds the form request into req parameter of functions in controller
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');

var app = express();
//encoding the url
app.use(bodyparser.urlencoded({
    extended: true
}));
//converting into json 
app.use(bodyparser.json());
//views is the directory where we are going to save views for our app
//__dirname it give us current or base directory for this project
//and we are joining the views folder
app.set('views', path.join(__dirname, '/views/'));
//this function is called to configure express engine for handle bars
//{} it has the configuration details for handle bars
//extname stands for extension name
//defaultLayout sets the default view for the app
//we have a file mainlayout.hbs it is in /views/layout
//and the last parameter is directory for layouts
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
//here we finally set the view engine as hbs
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

//bae url
app.use('/employee', employeeController);