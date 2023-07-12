const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token: token,
    data: {
      user: newUser,
    },
  });

  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please enter a valid email and password', 400));
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email: email }).select('+password');

  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(user.password, password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // If everything is ok, send the token to the client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Getting token and check if it's exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // Check if user still exists

  // Check if user changed password after the token use issued

  next();
});
