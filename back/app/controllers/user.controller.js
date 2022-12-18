const db = require("../models");
const User = db.user;
const _ = require("lodash");

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: 'user'
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      const response = _.map(data, item => ({
        username: item.username,
        email: item.email,
        id: item.id,
        role: item.role,
      }))
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found User with id " + id });
      } else {
        const response = _.map(data, item => ({
          username: item.username,
          email: item.email,
          id: item.id,
          role: item.role,
        }))
        res.send(response);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
