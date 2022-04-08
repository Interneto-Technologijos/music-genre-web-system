const spotify = require("../../spotify");
const net = require("./neural-network");

module.exports = (app) => {
  app.get("/track/:trackId/genre-details", (req, res) => {
    // todo: validate track id
    spotify.getAudioFeaturesByTrackId(
      req.params.trackId,
      (error, audioFeatures) => {
        if (error) {
          console.error(error);
          res.status(500).send();
          return;
        }

        res.json(
          net
            .run([
              audioFeatures.danceability,
              audioFeatures.energy,
              audioFeatures.speechiness,
              audioFeatures.acousticness,
              audioFeatures.instrumentalness,
              audioFeatures.liveness,
              audioFeatures.valence,
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
};
