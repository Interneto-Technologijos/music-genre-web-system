const request = require("supertest");

const server = require("../server.js");

describe("Track", () => {
  afterAll((cb) => {
    server(cb);
  });
  it("should reject shorter than 1 chars fragment", async () => {
    const response = await request("http://localhost:3000")
      .get("/track")
      .expect(400);
    expect(response.body.message).toBe("Invalid fragment");
  });
  it("should reject shorter than 1 chars fragment", async () => {
    const response = await request("http://localhost:3000")
      .get("/track?fragment=1")
      .expect(400);
    expect(response.body.message).toBe("Invalid fragment");
  });
  it("should reject longer than 20 chars fragment", async () => {
    const response = await request("http://localhost:3000")
      .get("/track?fragment=this is a very very very long fragment sent")
      .expect(400);
    expect(response.body.message).toBe("Invalid fragment");
  });
  it("should accept text fragment and return list of tracks matching the text fragment", async () => {
    const response = await request("http://localhost:3000")
      .get("/track?fragment=nirvana")
      .expect(200);
    expect(response.body.length).toBe(5);
    expect(response.body[0]).toMatchObject({
      id: "4gHnSNHs8RyVukKoWdS99f",
      artist: "Nirvana",
      title: "Something In The Way",
    });
    expect(response.body[1]).toMatchObject({
      id: "4CeeEOM32jQcH3eN9Q2dGj",
      artist: "Nirvana",
      title: "Smells Like Teen Spirit",
    });
    expect(response.body[2]).toMatchObject({
      id: "5zEAGm4yKQ8NMemN0m3rW1",
      artist: "A7S",
      title: "Nirvana",
    });
    expect(response.body[3]).toMatchObject({
      id: "2RsAajgo0g7bMCHxwH3Sk0",
      artist: "Nirvana",
      title: "Come As You Are",
    });
    expect(response.body[4]).toMatchObject({
      id: "20zTb6lu1t257GDy8LFDWK",
      artist: "LANNÉ",
      title: "Nirvana",
    });
  });
});
