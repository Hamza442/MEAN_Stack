//http is the core module to create the server
var http = require('http');
//this method create the server
//the function take 2 parameters request and responde object
//when ever there is a request to the server this function will be fired 
//request object will have all the details of the object 
//with the help of responde object we will be able to send response back to th client 
var Server = http.createServer(function(request,responde){
      //this how we write a response header
      console.log('request was made '+request.url);
      responde.writeHead(200,{'Content-Type':'text/plain'})
      //now we have to end the response and some thing back to the browser 
      //this how we do it 
      responde.end('Hello the server is responding to your request');
      
});
//to listen to the responde we have to specify a port number otherwise it will not listen
//for this purpose we use listen method 
//we will write ip adrress 127.0.0.1 this is local address 
//3000 is the port number 
Server.listen(3000,'127.0.0.1');
console.log('you are listening to port 3000');