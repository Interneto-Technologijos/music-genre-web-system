const request = require("supertest");

const server = require("../server.js");

describe("Track", () => {
  afterAll((cb) => {
    server(cb);
  });
  it("should accept text fragment and return list of tracks matching the text fragment", async () => {
    const response = await request("http://localhost:3000")
      .get("/track?fragment=nirvana")
      .expect(200);
    expect(response.body.length).toBe(5);
  });
});
