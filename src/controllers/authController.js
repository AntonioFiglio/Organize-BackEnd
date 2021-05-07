require("dotenv").config();
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const User = require("../model/User");

module.exports = {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw "Missing arguments";
      }

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: "Registration failed" });
      }

      const newUser = await new User({
        _id: uuid(),
        name: name,
        email: email,
        password: password,
      });

      await newUser.save();
      return res.status(200).json({ message: "sucess" });
    } catch (err) {
      return res.status(400).json({ message: "Registration failed" });
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw "Missing arguments";
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!(await bcript.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid password" });
      }

      user.password = undefined;
      const Token = jwt.sign({ id: user._id }, process.env.HASH_MD5, {
        expiresIn: 86400,
      });

      return res.status(200).json({ message: "sucess", user, Token });
    } catch (err) {
      return res.status(400).json({ message: "SignIn failed" });
    }
  },
};
