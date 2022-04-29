const fs = require('fs');
const express = require('express');

const app = express();

// this is middleware, which is a function that can modify the incming request data
// called middleware because it stands between the request and the response
// in the case of our post request, it's being used so that the data from the body is added to the request object
app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


// Route handlers:
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
};

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; // converts string to number

    const tour = tours.find(el => el.id === id)

    // if(id > tours.length) {
    if(!tour) { // "if there is no tour"
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length) { // "if there is no tour"
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }
    })
};

const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length) { // "if there is no tour"
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: "success",
        data: null
    })
};

// Routes:
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on ${port}`);
});

