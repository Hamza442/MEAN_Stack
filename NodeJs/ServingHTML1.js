var http = require('http');
var fs = require('fs');


var Server = http.createServer(function(Request,Response){

    console.log('request was made :'+Request.url);
    Request.writeHead(200,{'Content-Type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname+'/ServingHTML.html','utf8');
    myReadStream(Response);
});
Server.listen(3000,'127.0.0.1');
console.log('Listening to Port 3000');