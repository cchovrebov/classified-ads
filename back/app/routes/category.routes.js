const express = require("express");
const {
  isSignedInMiddleware,
  isAdminInMiddleware,
} = require('../moddleware/moddleware')

const app = express();

module.exports = app => {
  const category = require("../controllers/category.controller.js");

  const router = require("express").Router();

  // Retrieve all categories
  router.get("/", category.findAll);

  // Retrieve a single category with id
  router.get("/:id", category.findOne);

  // Update a category with id
  router.put("/:id", category.update);

  // Delete a category with id
  router.delete("/:id", category.delete);

  // Create a new category
  router.post("/", category.create);

  app.use("/api/category", router);
};
