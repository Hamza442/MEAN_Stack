// using fs module we can read on write files on our computer 
//it is convention to put variable name same as the module name but you can put any
var fs = require('fs');
//this is the method readFileSync() on fs module that can go out and read the Readme file
/*1.this is a synchronous method this means that it this method has some code below it will 
 not move to the code untill it reads the whole file 
 2.So this is blocking code we are blocking the flow of the code untill this is complete
 3. the first parameter is path of file in our case they are in same folder so only name will do 
 4. when we are reading the file we are dealing with binary encoding so we also have to provdie it 
 for ths purpose we provide character encoding in 2nd parameter*/
var ReadFile=fs.readFileSync('Readme.txt','utf8');
/*when writing a file first parameter is 
1.where the file must be written
2. 2nd parameter is the data we want to write to the file  */
fs.writeFileSync('writeme.txt',ReadFile);
console.log(ReadFile);