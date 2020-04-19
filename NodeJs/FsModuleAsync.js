var fs = require('fs');
//first we discused the synchornous version of read and write now we will see aysnchronous
/*as it asynchrounous method we need a call back function to tell when the process is completed
and that is the 3rd parameter here 
the function can have 2 parameter
1.error if there are any in this method
2.data that we have read from the file  */
/* so here the difference is that if this reading and there is some code after this method 
it will go to that code while doing reading and hence not blocking any code  */
fs.readFile('Readme.txt','utf8',function(error,data){
      
      console.log(data);
});
//we can check this with this it will show out of of test firts and then Readme file
//check the result in output 
console.log('test');
//we can also write 
//we are writing the data that being passed to data parameter in function thats we are using it 
