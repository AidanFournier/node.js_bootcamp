const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// Middleware
// exports.checkID = (req, res, next, val) => {
//     if(req.params.id * 1 > tours.length) { // "if there is no tour"
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }
//     next();
// }

// Route handlers/controllers:
exports.getAllTours = (req, res) => {
    console.log(req.requestTtime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTtime,
        // results: tours.length,
        // data: {
        //     tours
        // }
    })
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; // converts string to number

    // const tour = tours.find(el => el.id === id)
 
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour
    //     }
    // })
};

exports.createTour = async (req, res) => {
    try {
        // const newTour = new Tour({});
        // newTour.save();

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
    });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    };
};

exports.updateTour = (req, res) => {

    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }
    })
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    })
};