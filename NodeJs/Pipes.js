//pipes in node js  
var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname+'/Readme.txt','utf8');
var myWriteStream = fs.createWriteStream(__dirname+'/PipeStream.txt');
//pipe called upon read stream as it needs data to wrire so its imp to read first
myReadStream.pipe(myWriteStream);

//now we want to send back to the broswer 
var Server = http.createServer(function(Request,Response){
    
});