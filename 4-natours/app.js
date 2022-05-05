const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// this is middleware, which is a function that can modify the incming request data
// called middleware because it stands between the request and the response
// in the case of our post request, it's being used so that the data from the body is added to the request object

// Using third-party middleware:
app.use(morgan('dev'));

app.use(express.json());

// let's create our own middleware:
app.use((req, res, next) => { // by adding 'next'/any third argument, express now knows we're defining our own middleware
    console.log('Hello from the middleware ');
    next(); // never forget to call next, or the whole loop stops
})
// this middleware applies to every single request, at the top it is global
// if we put it in between some routes, it would only be called if a request came in for a route after it (location matters!)

// another middleware function, this time manipulating the req object:
app.use((req, res, next) => {
    req.requestTtime = new Date().toISOString();
    next();
})

// Routers mounted:
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;