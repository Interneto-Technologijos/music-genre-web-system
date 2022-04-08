const request = require("request");

let accessToken = null;

const getAccessToken = (cb) => {
  request.post(
    {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      },
      json: true,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        cb(new Error(error ? error.message : response.statusCode));
        return;
      }
      console.log(body);
      cb(null, body.access_token);
    }
  );
};

const getAudioFeatures = (trackId, accessToken, cb) =>
  request.get(
    {
      url: `https://api.spotify.com/v1/audio-features?ids=${trackId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

const refreshTokenAndGetAudioFeatures = (trackId, cb) => {
  getAccessToken((error, newAccessToken) => {
    if (error) {
      cb(error);
      return;
    }
    accessToken = newAccessToken;
    getAudioFeatures(trackId, accessToken, (error, audioFeatures) => {
      if (error) {
        cb(error);
        return;
      }
      cb(null, audioFeatures);
    });
  });
};

module.exports.getAudioFeaturesByTrackId = (trackId, cb) => {
  if (!accessToken) {
    refreshTokenAndGetAudioFeatures(trackId, (error, audioFeatures) => {
      if (error) {
        cb(error);
        return;
      }
      cb(null, audioFeatures);
    });
    return;
  }
  getAudioFeatures(trackId, accessToken, (error, audioFeatures) => {
    if (error) {
      if (error.message === 401) {
        refreshTokenAndGetAudioFeatures(trackId, (error, audioFeatures) => {
          if (error) {
            cb(error);
            return;
          }
          cb(null, audioFeatures);
        });
      }
      cb(error);
      return;
    }
    cb(null, audioFeatures);
  });
};
