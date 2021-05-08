const express = require("express");
const routes = express.Router();
const auth = require("../controllers/authController");

routes.post("/api/signUp", auth.signUp);
routes.post("/api/signIn", auth.signIn);

module.exports = routes;
