const request = require("supertest");

const server = require("../../../server.js");

describe("Track genre details", () => {
  afterAll((cb) => {
    server(cb);
  });
  it("should accept Spotify track ID and return genre details", async () => {
    const response = await request("http://localhost:3000")
      .get("/track/11dFghVXANMlKmJXsNCbNl/genre-details")
      .expect(200);
    expect(response.body.edm).toBeCloseTo(0.9, 1);
    expect(response.body.pop).toBeCloseTo(0.1, 1);
    expect(response.body.rnb).toBeCloseTo(0.08, 1);
    expect(response.body.rock).toBeCloseTo(0.04, 1);
  });
});
