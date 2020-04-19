//writeable streams 
var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname+'/Readme.txt','utf8');
/*1.for a write stream we have to tell where the data is going to be written
   2.we are providing the path and the name of the file where we want it to be written*/
var myWriteStream = fs.createWriteStream(__dirname+'/WriteStream.txt');

myReadStream.on('data',function(chunk){
    console.log('chunk recevied :');
    //now every time we receive a chunk we will write it 
    myWriteStream.write(chunk);
    
});