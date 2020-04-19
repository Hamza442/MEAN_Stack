//we can also do something like this let say we have a function
function saySomething(myname){
      myname();
}
//we write function expression
var sayName=function(){
    console.log('My name is Hamza');
};
//then we can use 
saySomething(sayName);
//the will pass sayName function to saySomething function and then it will invoke myname() call 