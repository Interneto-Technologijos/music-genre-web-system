const spotify = require("../spotify");

module.exports = (app) => {
  app.get("/track", (req, res) => {
    if (
      !req.query.fragment ||
      req.query.fragment.length < 2 ||
      req.query.fragment.length > 20
    ) {
      res.status(400).json({ message: "Invalid fragment" });
      return;
    }
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
