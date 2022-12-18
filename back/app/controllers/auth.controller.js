const db = require("../models");
const _ = require("lodash");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');
const User = db.user;

const generateJWT = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: user._id,
    username: user.username,
    role: user.role,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

const validPassword = ({
  password,
  user,
}) => bcrypt.compareSync(password, user.password);

// Sign in
exports.signIn = (req, res) => {
  const {
    username,
    password,
  } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "Some credentials are missing" });
    return;
  }

  const query = { username };

  User.find(query)
    .then(async (data) => {
      const user = _.first(data);
      const isPassValid = validPassword({
        password,
        user,
      })
      if (!user) {
        return res.status(404).send({ message: "No such user" });
      } else if (!isPassValid) {
        return res.status(404).send({ message: "Incorrect password" });
      } else {
        const response = {
          username: user.username,
          email: user.email,
          id: user.id,
          role: user.role,
          token: generateJWT(user),
        }
        res.send(response)
      };
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Login error" });
    });
};

