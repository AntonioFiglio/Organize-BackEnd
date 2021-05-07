const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  mongoose.connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log(error);
  });

  db.once("open", () => {
    console.log("Started connect");
  });
}

module.exports = connectDB;
