// what ever the events module will return it will be returned in the variable 
var Event = require('events');
//this one of the properties it return is event emitter
//event emitter is used to create custom events     
//myEmitter will store the EventEmitter object 
var myEmitter = new Event.EventEmitter();
//this is telling us on some event this function will be fired which is taking message as parameter
//this how we can make our own event
myEmitter.on('someEvent',function(mssg){
       console.log(mssg);
});
//this how we call a emit a event 
//1. the event we want to emit
//2. the argument which we are passing 
myEmitter.emit('someEvent','the event has been emitted');