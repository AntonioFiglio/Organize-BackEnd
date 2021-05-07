const express = require("express");
const routes = express.Router();
const auth = require("./controllers/authController");

routes.post("/api/user/signUp", auth.signUp);
routes.post("/api/user/signIn", auth.signIn);

module.exports = routes;
