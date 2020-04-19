var Event = require('events');
//util module allow us to inherit from objetcs brought in node js   
var Util = require('util');
//we want this person to inherit eventemitter
var Person = function(name){
    this.name=name;
};
//the first paramter is the object that we want should inherit 
//the second parameter is the thing that we want it to inherit
//now any thing created using the person can have custom events attached to it 
Util.inherits(Person,Event.EventEmitter);
// now we will create some persons
var hamza = new Person('Hamza');
var ali = new Person('Ali');
var asim = new Person('Asim');
//and store them is a array
var People = [hamza,ali,asim];
//the we will prefrom this event foreach person looping through array
//the objects hamza ali and asim are being passed to the function and person parameter is receivng them
// when we emit speak event then it will tell the who spoke and the message that we are passing
People.forEach(function(person){
  person.on('speak',function(mssg){
        console.log(person.name+' said :'+mssg);
  });
});
// speak is the event on which the function will be invoked
//the second parameter is the message
hamza.emit('speak',' hey ali how are you ?');
ali.emit('speak','i am fine');
asim.emit('speak','what you guyz are upto');