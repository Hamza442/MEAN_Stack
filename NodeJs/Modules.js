// here counter function which is a member of module counter is being returned here so we have to
//save it in a variable
var Counter=require('./counter');
//the variable Counter is know a reference to the count variable in counter module
//so we can use this to pass values 
console.log(Counter(['Hamza','Ali','Qumail','Asim']));