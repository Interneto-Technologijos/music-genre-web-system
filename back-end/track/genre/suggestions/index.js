const { suggestions } = require("../details/neural-network");

module.exports = (app) => {
  app.post("/track/genre/suggestion", (req, res) => {
    suggestions.push(req.body);
    res.status(200).end();
  });
};
