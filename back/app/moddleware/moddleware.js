const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

exports.isSignedInMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(503).send('Unauthorized')
  }
}