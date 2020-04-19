//this is how we can return different members of a modeule to others
var counter = function(arr){
    return 'There are '+arr.length+' elemenst in this array';
};
var adder = function(a,b){
    var c=a+b;
     return 'There sum of two numbers is '+c;
};
 var pi=3.142;
 
 var product = function(a,b){
    var c=a*b;
    return 'The product of 2 numbers is '+c;
};
var divison = function(num1,num2){
   return 'The divsion of 2 numbers is '+(num1/num2);
};

 module.exports.counter=counter;
 module.exports.adder=adder;
 module.exports.pi=pi;
 // we can also follow more simple way of exporting 
 module.exports.subtraction=function(x,y){
     var z=x+y;
     return 'The subtraction of two numbers is '+z;
 };
 //we also exports by passing in object f

 module.exports={
     product:product,
     divsion:divison

 };