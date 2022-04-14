const fs = require('fs');
const crypto = require('crypto'); // all functions from this package will be offloaded automaatically by the event loop to the thread pool

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;  // channge the threadpool size

setTimeout(() => console.log('Timer 1 finished'), 0); // this code isn't in an I/O cycle and therefore it's not actually in the loop; 
setImmediate(() => console.log("Immediate 1 finished")); // it's not in any callback function, and all 3 will appear in random order

fs.readFile('test-file.txt', () => {
    console.log('I/O finished') 
    console.log('---------------') 

    setTimeout(() => console.log('Timer 2 finished'), 0); // now we move them into a callback function
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log('Process.nextTick'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    });
});

console.log('Hello from the top-level code'); // this is top-level because it's the only one not inside a callback