var http = require('http');
var fs = require('fs');

var Server = http.createServer(function(Request,Response){
    console.log('The request is :'+Request.url);
    Request.wirteHead(200,{'Content-Type':'ServingJSON1/json'});
    //here this is the json object that we want to send to client
    var myObj = {
        name:'Hamza',
        job:'Data-Analyst',
        age:23
    }
    //through end method we will send object back to client 
    //we cant pass the object 
    /*The end method expects a string or a buffer so we cant pass it 
      for this purpose we have to convert this json object into a string which will be in json format
      for this we use JSON.stringify() */
    Request.end(JSON.stringify(myObj));
});
Server.listen(3000,'127.0.0.1');
console.log('Listening to Port 3000');