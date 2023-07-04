const {
  addTour,
  deleteTour,
  getTour,
  gettAllTours,
  updateTour,
  checkID,
  checkBody,
} = require('./../controllers/tourController');
const express = require('express');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(gettAllTours).post(checkBody, addTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
