import request from "supertest";
import server from "../../src/server/server";

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(server).get("/").expect(200, done);
  });
});

afterAll(() => {
  console.log("Closing server");
  server.close();
});
