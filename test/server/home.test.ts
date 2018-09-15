import request from "supertest";
import server from "../../src/server/server";
import * as homeCtrl from "../../src/server/controllers/home";
import { createMockContext } from "../utilities";

describe("controllers/home.ts", () => {
  it("index() should set body", async (done) => {
    const ctx = createMockContext();
    await homeCtrl.index(ctx);
    expect(ctx.body).toContain("Hello, User");
    done();
  });
});

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(server).get("/").expect(200, done);
  });
});

afterAll(() => {
  console.log("Closing server");
  server.close();
});
