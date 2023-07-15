const Review = require('./../models/reviewModel');
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError.js');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const tourId = req.params.tourId;
  const userId = req.user.id;

  // Check if tour exists
  const tour = await Tour.findById(tourId);
  if (!tour) next(new AppError('No such tour exists', 404));
  // Check if user exists
  const user = await User.findById(userId);
  if (!user) next(new AppError('No such user exists', 404));

  // Allow nested routes
  if (!req.body.tour) req.body.tour = tourId;
  if (!req.body.user) req.body.user = userId;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
