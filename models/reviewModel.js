const mongoose = require('mongoose');
const Tour = require('./tourModel');
const catchAsync = require('../utils/catchAsync');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'required a review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'required a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'required a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'required a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

//TODO: add implementation for average ratings and quantity changes
// reviewSchema.statics.calcAverageRatings = async function (tourId) {
//   const stats = await this.aggregate([
//     {
//       $match: { tour: tourId },
//     },
//     {
//       $group: {
//         _id: '$tour',
//         nRating: { $sum: 1 },
//         avgRating: { $avg: '$rating' },
//       },
//     },
//   ]);

//   console.log(stats);

//   await Tour.findByIdAndUpdate(tourId, {
//     ratingQuantity: stats[0].nRating,
//     ratingAverage: stats[0].avgRating,
//   });
// };

// reviewSchema.post('save', function () {
//   // This points to the current review+
//   this.constructor.calcAverageRatings(this.tour);
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
