module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  const router = require("express").Router();

  // Sign in
  router.post("/sign-in", auth.signIn);

  app.use("/api/auth", router);
};
