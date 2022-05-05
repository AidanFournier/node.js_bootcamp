const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Route handlers/controllers:
exports.getAllTours = (req, res) => {
    console.log(req.requestTtime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTtime,
        results: tours.length,
        data: {
            tours
        }
    })
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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