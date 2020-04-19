var fs = require('fs');

fs.mkdir('AsyncDirectory',function(){
    fs.readFile('Readme.txt','utf8',function(error,data){
        fs.writeFile('./AsyncDirectory/AsyncFile.txt',data,function(error,data){
            if(error){
                console.log('error',data);
            }
        });
    });
});
//for removing
/*
    var fs = require('fs');
    fs.unlink('./AsyncDirectory/AsyncFile.txt',function(){
        fs.rmdir('AsyncDirectory');
    });
*/