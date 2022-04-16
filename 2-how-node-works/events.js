const EventEmitter = require('events'); // a built-in module that

// const myEmitter = new EventEmitter();

// event emitters can emit named events and we can then subscribe to these events (so listen to them) and then react accordingly
// this is a bit like setting up an event listener on a dom element, for example like clicking on a button
// our emitter will eventually emit a named events

// if we were doing this properly, in a real-life situation, we would create a class to inherit from EventEmitter class:
// Sale is the parent class, EventEmitter is the super class
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

// 2. so now we have to set up the listeners:
myEmitter.on('newSale', () => {
    console.log('There was a new sale!');
});

// we can set up multiple listeners for the same event
myEmitter.on('newSale', () => {
    console.log('Customer name: Jonas');
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock`);
});

// 1. the set-up (let's pretend we're building an online store):
// we can make up any event name we want
myEmitter.emit('newSale', 9); // this is like if we were clicking on a button
// can also passs arguments to the emitter, which the listeners can then use

////////////////////////

// in this example, we're going to create a small web server, and then actually listen to the event that it emits
