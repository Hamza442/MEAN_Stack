//this file has the data base connection
//for this purpose we will use npm package mongoose
const mongoose = require('mongoose');
//then we can connect using .connect() method
//CrudDB is the name of database
/*After connection we will have a call back function for
possible errors */
mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.......');
    }
    else {
        //this will convert err object into a string with spacing 2
        console.log('Error in DB connection :' + JSON.stringify(err, undefined, 2));
    }
});
//we need connection out of this file 
//export this module/file
module.exports = mongoose;