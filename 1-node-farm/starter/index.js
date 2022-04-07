const fs = require("fs");
// fs stands for file system
// by using this module, we will get access to functions for reading and writing data
// this module will return an object for which there are lots of functions we can used, stored in the fs variable

const http = require('http');
const { reset } = require("nodemon");
// this is a built-in module that gives us networking capabilities and will allow uss to build a server

const url = require('url');

// ------------- FILES

// //Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // Sync stands for synchronous (vs asynchronous)
// // this takes two arguments: first is the path to th file we're reading, second we deefine the character encoding
// // calling this function will rread the data we're giving to it and return it to us, and we need to save this into a variable
// // this is synchronous in nature; each statement is processes one after another, line by line

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// // now create a new file:
// fs.writeFileSync("./txt/output.txt", textOut); // this doesn't return anything meaningful, so we don't save it to any variable
// console.log("File written!");

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

// Non-Blocking, asynchonous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// })
// the 2nd parameteeer here is the callback function
// many times, the first parameter inside a callback function will be the error, in case there wass any
// err is usually first
// the second param is the data itself
// when called, this function starts reading the file 'start.txt' without disrupting the rest of the code

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     // if (err) return console.log('Error!!');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             // now to write a file:
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written :)');
//             })
//         });
//     });
// });

// data1 will be start.txt, which contains 'read-this'
// that will then make up the file name in the next level
// next step: there is some info in the append file that we want to add to this text

// ------------- SERVER

// first we create the server, then we start the server so that it can actually listen to incoming requests
// createServer accepts a callback request that will be fired off any time a new request hits our server

// 1. Create server/API

// the code executed outside of the callback function (the top-level code) is only executed once we start the program, so it doesn't matter if it blocks the execution (its synchronous)

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);

        res.end(output);

    // Product page
    } else if (pathName === '/product') {
        res.end('This is the product');

    // API
    } else if (pathName === '/api') {
        // we now have access to this data, which is currently in json
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            // what is a header? http header is a piece of info about the response we are sending back
            // always send headers before the response content (res.end)
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
// res.end('Hello from the server!'); // .end is the simplest way to send back a response 
});

// 2. Listen for requests on local host IP
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on Port 8000');
}) 
// first parameter is the port, can accept different kinds
// 2nd is local host (current program), current computer in use
// 127.0.0.1 is standard IP address for local host
// third param is a callback function that will be run as soon as server starts listening

// ------------- ROUTES
// Express will help us with more complex routing in future
// for now, we'll do simple routing
// first step is to be able to analyze the url; for that, we use another built-in node module (line 11)
// url mod parses values at end of url into nicely formatted objects
// for routing, all we need is a big if/else statment