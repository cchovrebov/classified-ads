const {
  isAdminInMiddleware,
} = require('../moddleware/moddleware')

module.exports = app => {
  const post = require("../controllers/post.controller.js");

  const router = require("express").Router();

  // Create a new post
  router.post("/", post.create);

  // Retrieve all posts
  router.get("/", post.findAll);

  // Retrieve all published posts
  router.get("/published", post.findAllPublished);

  // Retrieve a single post with id
  router.get("/:id", post.findOne);

  // Update a post with id
  router.put("/:id", post.update);

  // Delete a post with id
  router.delete("/:id", post.delete);

  // Create a new post
  router.delete("/", post.deleteAll);

  // Publish a category with id
  router.put("/publish/:id", post.publish);

  app.use("/api/post", router);
};
