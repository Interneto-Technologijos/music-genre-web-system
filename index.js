require("dotenv").config();

const request = require("request");
const express = require("express");
const brain = require("brain.js");
const app = express();

app.get("/track/:trackId/genre-details", (req, res) => {
  request.get(
    {
      url: `https://api.spotify.com/v1/audio-features?ids=${req.params.trackId}`,
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
      json: true,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.error(response.statusCode, body, error);
        res.status(500).send();
        return;
      }

      const net = new brain.NeuralNetwork({
        binaryThresh: 0.5,
        hiddenLayers: [3],
        activation: "sigmoid",
        leakyReluAlpha: 0.01,
      });

      net.train([{ input: [0.0235], output: [1, 0, 0, 0] }]);
      net.train([{ input: [0.101], output: [0, 1, 0, 0] }]);
      net.train([{ input: [0.0849], output: [0, 0, 1, 0] }]);
      net.train([{ input: [0.141], output: [0, 0, 0, 1] }]);

      res.json(
        net
          .run([body.audio_features[0].acousticness])
          .reduce((details, value, index) => {
            switch (index) {
              case 0:
                return { ...details, rock: value };
              case 1:
                return { ...details, pop: value };
              case 2:
                return { ...details, rnb: value };
              case 3:
                return { ...details, edm: value };
              default:
                throw new Error("No such genre");
            }
          }, {})
      );
    }
  );
});

app.use("/", express.static("public"));

app.listen(process.env.PORT || 3000);
