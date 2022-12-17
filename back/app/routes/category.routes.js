module.exports = app => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new category
  router.post("/", category.create);

  // Retrieve all categories
  router.get("/", category.findAll);

  // Retrieve a single category with id
  router.get("/:id", category.findOne);

  // Update a category with id
  router.put("/:id", category.update);

  // Delete a category with id
  router.delete("/:id", category.delete);

  app.use("/api/category", router);
};