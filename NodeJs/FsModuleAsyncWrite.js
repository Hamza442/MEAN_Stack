var fs = require('fs');

fs.readFile('Readme.txt','utf8',function(error,data){
    fs.writeFile('AsyncWrite.txt',data,function(error,result){
        if(error){
            console.log('error',error);
        }
    });
});