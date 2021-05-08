const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "no token provided" });
  }

  jwt.verify(authHeader, process.env.HASH_MD5, (err, decodded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }
    req.userId = decodded.id;
    return next();
  });
};
