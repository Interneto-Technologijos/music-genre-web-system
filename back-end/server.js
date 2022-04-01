require("dotenv").config();

const express = require("express");

const app = express();

require("./track/genre-details")(app);

app.use("/", express.static("public"));

app.listen(process.env.PORT || 3000);
