const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserShema = new Schema({
  _id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserShema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 15);
  this.password = hash;
  next();
});

const User = model("User", UserShema);

module.exports = User;
