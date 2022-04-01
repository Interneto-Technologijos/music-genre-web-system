const request = require("request");

module.exports.getAudioFeaturesByTrackId = (trackId, cb) => {
  request.get(
    {
      url: `https://api.spotify.com/v1/audio-features?ids=${trackId}`,
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
      json: true,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        cb(new Error(error ? error.message : response.statusCode));
        return;
      }
      cb(null, body.audio_features[0]);
    }
  );
};
