const express = require("express");
const brain = require("brain.js");
const app = express();

app.get("/track/:trackId/genre-details", (_req, res) => {
  const audioFeatures = {
    acousticness: 0.00242,
    analysis_url:
      "https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n",
    danceability: 0.585,
    duration_ms: 237040,
    energy: 0.842,
    id: "2takcwOaAZWiXQijPHIx7B",
    instrumentalness: 0.00686,
    key: 9,
    liveness: 0.0866,
    loudness: -5.883,
    mode: 0,
    speechiness: 0.0556,
    tempo: 118.211,
    time_signature: 4,
    track_href: "https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n",
    type: "audio_features",
    uri: "spotify:track:2takcwOaAZWiXQijPHIx7B",
    valence: 0.428,
  };

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
    net.run([audioFeatures.acousticness]).reduce((details, value, index) => {
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
});

app.use("/", express.static("public"));

app.listen(process.env.PORT || 3000);
