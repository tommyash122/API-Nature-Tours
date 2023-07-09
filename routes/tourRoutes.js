const {
  createTour,
  deleteTour,
  getTour,
  gettAllTours,
  updateTour,
  aliasTopTours,
  getToursStats,
  getMonthlyPlan,
} = require('./../controllers/tourController');
const express = require('express');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, gettAllTours);
router.route('/tours-stats').get(getToursStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(gettAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
