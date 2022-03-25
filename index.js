const express = require("express");
const app = express();

app.get("/track/:trackId/genre-details", (_req, res) => {
  res.json({
    rock: 0.5,
    pop: 0.75,
    rnb: 0.62,
    edm: 0.3,
  });
});

app.use("/", express.static("public"));

app.listen(process.env.PORT || 3000);
