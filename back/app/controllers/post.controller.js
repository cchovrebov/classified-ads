const db = require("../models");
const Post = db.post;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');
const _ = require('lodash')

// Create and Save a new Post
exports.create = (req, res) => {
  const token = req.headers.token
  const user = jwt.verify(token, secret);
  // Create a Post
  const imagesBase64 = _.map(req.body.images, 'data_url').join('[SEPARATOR]');
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    images: imagesBase64,
    published: false,
    user: user.id
  });

  post
    .save(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.find({ published: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const imagesBase64 = _.map(req.body.images, 'data_url').join('[SEPARATOR]');
  const post = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    images: imagesBase64,
    published: false
  };

  Post.findByIdAndUpdate(id, post, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all post."
      });
    });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
  Post.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};


// Publish a Post by the id in the request
exports.publish = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to publish can not be empty!"
    });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, { published: true }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot publish Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post was publish successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};