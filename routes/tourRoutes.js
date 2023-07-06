const {
  createTour,
  deleteTour,
  getTour,
  gettAllTours,
  updateTour,
} = require('./../controllers/tourController');
const express = require('express');

const router = express.Router();

// router.param('id', checkID);

router.route('/').get(gettAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
