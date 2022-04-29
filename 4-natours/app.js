const fs = require('fs');
const express = require('express');

const app = express();

// this is middleware, which is a function that can modify the incming request data
// called middleware because it stands between the request and the response
// in the case of our post request, it's being used so that the data from the body is added to the request object
app.use(express.json());

// this is called the route handler:
// app.get('/', (req, res) => {
//     res.status(200)
//     .json({message: 'Hello from the server side', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint');
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);
    // usually, database taakes care of adding id to new object; since we're working with a file as our 'database' rn, we need to set the id
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id: newId}, req.body); // this combines two objects

    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours), 
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on ${port}`);
});

