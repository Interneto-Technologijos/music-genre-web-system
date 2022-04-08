require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

require("./track")(app);
require("./track/genre/details")(app);
require("./track/genre/suggestions")(app);

app.use("/", express.static("public"));

const server = app.listen(process.env.PORT || 3000, () =>
  console.log("http://localhost:3000")
);

module.exports = (cb) => {
  server.close(cb);
};
