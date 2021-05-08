require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const routesPublic = require("./routes/routesPublic");
const routesPrivate = require("./routes/routesPrivate");
const connectDB = require("./database/config");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("http://localhost:3000/"));

app.use(routesPublic);
app.use(routesPrivate);

app.listen(port, () => {
  console.log(`I'm listening at http://localhost:${port}`);
});
