require("dotenv").config();

const express = require("express");

const app = express();

require("./track/genre-details")(app);

app.use("/", express.static("public"));

const server = app.listen(process.env.PORT || 3000, () =>
  console.log("http://localhost:3000")
);

module.exports = (cb) => {
  server.close(cb);
};
