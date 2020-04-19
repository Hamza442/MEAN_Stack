//Readable streams
var http = require('http');
var fs = require('fs');

//method to make read stream
//this method going to read the data from the Readme file and store it in the variable
//we remove character encoding then we will receive buffer not actual data 
//you can see result by removing it 
var myReadStream = fs.createReadStream(__dirname+'/Readme.txt','utf8');
//when were we are going to receive the chunk of data we are going to listen to it 
//and going to fire some fuction aganist it 
//when you fire it will show you one chunk of data but if you use a bigger file many chunks will be received 
myReadStream.on('data',function(chunk){
    console.log('new chunk received :');
    console.log(chunk);
});