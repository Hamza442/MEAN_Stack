//in normal java script we write function as
function sayHi(){
    console.log('hi');
}
//then we call the function 
sayHi();
setTimeout(function(){
     console.log('bye');
},3000);
//we write function expression as
var sayBye = function(){
    console.log('bye');
};
sayBye();
