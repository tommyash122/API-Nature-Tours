const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword for this action.',
        400
      )
    );
  }
  // Filtered out unwanted fields name that are not allowed to be updated in here.
  const filteredBody = filterObj(req.body, 'name', 'email');
  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // console.log(filteredBody, updatedUser);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.addUser = (req, res) => {
  res.status(500).json({
    status: '500 Internal Server Error',
    message: 'This route is not yet supported',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: '500 Internal Server Error',
    message: 'This route is not yet supported',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: '500 Internal Server Error',
    message: 'This route is not yet supported',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: '500 Internal Server Error',
    message: 'This route is not yet supported',
  });
};
