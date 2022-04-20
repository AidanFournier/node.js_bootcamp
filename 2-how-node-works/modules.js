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