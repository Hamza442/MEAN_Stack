var methods=require('./ModulePatterns');

console.log(methods.counter(['Hamza','Ali']));
console.log(methods.adder(2,4));
// we can aslo access the variable pi that we have declared in the other module
console.log(methods.adder(methods.pi,5));
console.log(methods.subtraction(9,6));
console.log(methods.divsion(8,5));
