module.exports = app => {
  const like = require("../controllers/like.controller.js");

  const router = require("express").Router();

  // Create a new likes
  router.post("/", like.create);

  // Retrieve all likes
  router.get("/", like.findAll);

  // Create a new likes
  router.delete("/:id", like.delete);

  app.use("/api/like", router);
};
