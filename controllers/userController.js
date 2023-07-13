const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

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
