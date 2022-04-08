const spotify = require("../spotify");

module.exports = (app) => {
  app.get("/track", (req, res) => {
    spotify.searchTracksByQuery(req.query.fragment, (error, tracks) => {
      if (error) {
        console.error(error);
        res.status(500).send();
        return;
      }
      res.json(
        tracks.map((track) => ({
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
        }))
      );
    });
  });
};
