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
exports.getAllTours = async (req, res) => {
    try {
        // Build query:
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: 'easy'
        // });

        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

        const query = Tour.find(queryObj);

        // Execute query:
        const tours = await query;

        // Send response:
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        }); 
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTour = async (req, res) => {
  try {
    // Tour.findOne({ _id: req.params.id })
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
  } catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    });
  }
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
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour
                //tour:  tour (w/ ES6 we have a shorthand)
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
  
    
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
          });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
