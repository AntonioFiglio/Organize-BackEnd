const express = require("express");
const app = express();
const port = 5000;
const routes = require("./routes");
const connectDB = require("./database/config");

connectDB();

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`I'm listening at http://localhost:${port}`);
});

