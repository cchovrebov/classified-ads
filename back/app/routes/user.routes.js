module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const express = require("express");
  const router = express.Router();

  // Create a new User
  router.post("/", user.create);

  // Retrieve all User
  router.get("/", user.findAll);

  // Delete a user with id
  router.delete("/:id", user.delete);

  app.use("/api/user", router);
};
