const fs = require("fs");
// fs stands for file system
// by using this module, we will get access to functions for reading and writing data
// this module will return an object for which there are lots of functions we can used, stored in the fs variable

const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // Sync stands for synchronous (vs asynchronous)
// this takes two arguments: first is the path to th file we're reading, second we deefine the character encoding
// calling this function will rread the data we're giving to it and return it to us, and we need to save this into a variable

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// now create a new file:
fs.writeFileSync("./txt/output.txt", textOut); // this doesn't return anything meaningful, so we don't save it to any variable
console.log("File written!");
