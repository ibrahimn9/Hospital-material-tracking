const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { Compte } = require('../models');
const ApiError = require('../utils/ApiError');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new ApiError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  const currentUser = await Compte.findByPk(decoded.id);

  if (!currentUser) {
    return next(new ApiError('The user belonging to this token no longer exists.', 401));
  }

  req.user = currentUser;
  next();
};
