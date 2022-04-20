// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports:
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports:
// const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2'); // we can use ES6 destucturing; these names have to be same as property names on object
console.log(multiply(2, 5));

//caching
// we have caching in node.js modules
require("./test-module-3")();  // we could put this in a variable. but we dont have to
require("./test-module-3")();
require("./test-module-3")();

// technically, this module was loaded only once because of caching, so the top level code (Hello...) was only logged once at the beginning