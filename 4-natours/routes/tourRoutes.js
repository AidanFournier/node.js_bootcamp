// each router is lke a mini-application unto itelf, one for each resource

const express = require('express');
const tourController = require('./../controllers/tourController');

// Routes:
const router = express.Router();

// Middleware function, only applied to tour router since we're inside that 'mini-app':
// router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
