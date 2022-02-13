const fs = require("fs");
// fs stands for file system
// by using this module, we will get access to functions for reading and writing data
// this module will return an object for which there are lots of functions we can used, stored in the fs variable

const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // Sync stands for synchronous (vs asynchronous)
// this takes two arguments: first is the path to th file we're reading, second we deefine the character encoding
// calling this function will rread the data we're giving to it and return it to us, and we need to save this into a variable
// this is synchronous in nature; each statement is processes one after another, line by line

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// now create a new file:
fs.writeFileSync("./txt/output.txt", textOut); // this doesn't return anything meaningful, so we don't save it to any variable
console.log("File written!");

// Synchronous vs. Asynchronous

// the above code is synchronous in nature; each statement is processes one after another, line by line
// we can say that this is blocking code, because a certain operation can only be executed after the one before it is finished
// this is a huge problme for Node.js
// the solution: asynchronous, non-blocking code

// in asynchronous, we offload heavy work to be done in the background
// then, once that work is done, a callback function up beforehand will give us the result
// during this time, the rest of the code can still be executing
// non blocking I/O model (input/output): accessing file system and handling network requests
// Node.js completely designed around callbacks

// why is blocking such a problem? Why do we use so many callback functions in Node.js?
// Node.js is sngle-threaded; for each application, only one thread
// all users using application are using one thread
// when one users blocks the thread with synchronous code, all other users have to wait for that process to finish before their code can run

// using callbacks doesn't make our code asynchronous automatically; passing functions around into othewr functions is quite common in javacsript, but doesn't make is asynchornous automatically
// only works for some functions in Node API, such as readFile function
