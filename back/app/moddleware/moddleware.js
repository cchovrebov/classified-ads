const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

exports.isSignedInMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(503).send('Forbidden')
  }
}

exports.isAdminInMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, secret);
    if (!user.role === 'admin') {
      return res.status(503).send('Forbidden');
    }
    return next();
  } catch (error) {
    return res.status(503).send('Forbidden')
  }
}