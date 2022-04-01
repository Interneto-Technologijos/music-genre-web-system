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
        activation: "sigmoid",
        inputSize: 7,
        inputRange: 7,
        hiddenLayers: [7, 7],
        // outputSize: 7,
        learningRate: 0.01,
        decayRate: 0.999,
      });

      const metallicaEnterSandman = {
        id: "5sICkBXVmaCQk5aISGR3x1",
        danceability: 0.577,
        energy: 0.828,
        speechiness: 0.0298,
        acousticness: 0.00213,
        instrumentalness: 0.0114,
        liveness: 0.0581,
        valence: 0.604,
      };

      const weekndBlindingLights = {
        id: "0VjIjW4GlUZAMYd2vXMi3b",
        danceability: 0.514,
        energy: 0.73,
        speechiness: 0.0598,
        acousticness: 0.00146,
        instrumentalness: 0.0000954,
        liveness: 0.0897,
        valence: 0.334,
      };

      const drakeKnifeTalk = {
        id: "2BcMwX1MPV6ZHP4tUT9uq6",
        danceability: 0.849,
        energy: 0.424,
        speechiness: 0.324,
        acousticness: 0.0635,
        instrumentalness: 0,
        liveness: 0.0834,
        valence: 0.153,
      };

      const aviciiLevels = {
        id: "5UqCQaDshqbIk3pkhy4Pjg",
        danceability: 0.584,
        energy: 0.889,
        speechiness: 0.0343,
        acousticness: 0.0462,
        instrumentalness: 0.828,
        liveness: 0.309,
        valence: 0.464,
      };

      train(net, metallicaEnterSandman, [1, 0, 0, 0]);
      train(net, weekndBlindingLights, [0, 1, 0, 0.75]);
      train(net, drakeKnifeTalk, [0, 0, 1, 0]);
      train(net, aviciiLevels, [0, 0.25, 0, 1]);

      res.json(
        net
          .run([
            body.audio_features[0].danceability,
            body.audio_features[0].energy,
            body.audio_features[0].speechiness,
            body.audio_features[0].acousticness,
            body.audio_features[0].instrumentalness,
            body.audio_features[0].liveness,
            body.audio_features[0].valence,
          ])
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

const train = (net, details, output) => {
  net.train([
    {
      input: [
        details.danceability,
        details.energy,
        details.speechiness,
        details.acousticness,
        details.instrumentalness,
        details.liveness,
        details.valence,
      ],
      output,
    },
  ]);
};

app.use("/", express.static("public"));

app.listen(process.env.PORT || 3000);
