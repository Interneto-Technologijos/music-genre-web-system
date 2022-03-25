const request = require("supertest");

require("./index");

it("should accept Spotify track ID and return genre details", async () => {
  const response = await request("http://localhost:3000")
    .get("/track/11dFghVXANMlKmJXsNCbNl/genre-details")
    .expect(200);
  expect(response.body).toStrictEqual({
    rock: 0.5,
    pop: 0.75,
    rnb: 0.62,
    edm: 0.3,
  });
});
