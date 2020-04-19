var http = require('http');
var fs = require('fs');

var Server = http.createServer(function(Request,Response){
    console.log('request was made :'+Request.url);
    Response.writeHead(2000,{'Content-Type':'text/plain'});
    var myReadStream = fs.createReadStream(__dirname+'/Readme.txt','utf8');
    //as now the we will write to our user 
    //we are sending data to the cleint and also ending the response 
    myReadStream.pipe(Response);
});
Server.listen(3000,'127.0.0.1');
console.log('Listening ot port 3000');