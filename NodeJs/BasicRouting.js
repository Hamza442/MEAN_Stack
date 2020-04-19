var http = require('http');
var fs = require('fs');

var Server = http.createServer(function(Request,Responde){
    //here we are listning to what kind of request user is sending through Request.url property
    /*what we can do is that we can check the request and then send the data according to the user
    request  */
    console.log('The Request was made :'+Request.url);
    if(Request.url==='/home'||Request.url==='/'){
        Request.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/ServingHTML.html').pipe(Request);
    }else if(Request.url==='/contact'){
        Request.writeHead(200,{'Content-Type':'text/html'});
        fs,createReadStream(__dirname+'Contact.html').pipe(Request);
    }else{
        Request.writeHead(404,{'Content-Type':'text.html'});
        fs.createReadStream(__dirname+'Error404.html').pipe(Request);
    }
});
Server.listen(3000,'127.0.0.1');
console.log('Listening to port 3000');