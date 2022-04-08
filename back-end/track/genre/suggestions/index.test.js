const request = require("supertest");

const server = require("../../../server.js");

describe("Track Genre Suggestions", () => {
  afterAll((cb) => {
    server(cb);
  });
  it("should accept track genre suggestion", async () => {
    await request("http://localhost:3000")
      .post("/track/genre/suggestion")
      .send({ trackId: "1ybXQSaEE5E4jv5LbgpMXm", details: [0, 1, 0, 0] })
      .set("Content-Type", "application/json")
      .expect(200);
  });
});
