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
  router.get("/", app.use(isSignedInMiddleware), category.findAll);

  // Retrieve a single category with id
  router.get("/:id", app.use(isSignedInMiddleware), category.findOne);

  // Update a category with id
  router.put("/:id", app.use(isAdminInMiddleware), category.update);

  // Delete a category with id
  router.delete("/:id", app.use(isAdminInMiddleware), category.delete);

  // Create a new category
  router.post("/", app.use(isAdminInMiddleware), category.create);

  app.use("/api/category", router);
};
