const express = require("express");
const routes = express.Router();
const authMiddleeware = require("../middlewares/auth");
const profile = require("../controllers/profileController");

routes.use(authMiddleeware);

routes.post("/api/profile/changePassword", profile.changePassword);

module.exports = routes;
