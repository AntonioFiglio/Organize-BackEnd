const express = require("express");
const routes = express.Router();
const authMiddleeware = require("../middlewares/auth");
const auth = require("../controllers/authController");
const profile = require("../controllers/profileController");

routes.use(authMiddleeware);

routes.post("/api/profile/settings", profile.changePassword);
routes.post("/api/profile/logout", auth.Logout);

module.exports = routes;
