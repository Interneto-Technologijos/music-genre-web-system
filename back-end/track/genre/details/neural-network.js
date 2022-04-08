const brain = require("brain.js");

let suggestions = [];

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

module.exports = { net, suggestions };
