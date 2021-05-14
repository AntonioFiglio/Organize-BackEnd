require("dotenv").config();
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const User = require("../model/User");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.HASH_MD5, {
    algorithm: "HS256",
    expiresIn: 86400,
  });
}

module.exports = {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw "Missing arguments";
      }

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await new User({
        _id: uuid(),
        name: name,
        email: email,
        password: password,
      });

      await user.save();

      user.password = undefined;

      return res.status(200).json({
        message: "sucess",
        user,
        token: generateToken({ id: user._id }),
      });
    } catch (err) {
      return res.status(400).json({ message: "Registration failed" });
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Missing arguments" });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!(await bcript.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid password" });
      }

      user.password = undefined;

      return res.status(200).json({
        message: "sucess",
        user,
        token: generateToken({ id: user._id }),
      });
    } catch (err) {
      return res.status(400).json({ message: "SignIn failed" });
    }
  },
  async Logout(req, res) {
    res.json({ message: "sucess" });
  },
};
