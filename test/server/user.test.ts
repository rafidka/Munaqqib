import request from "supertest";
import server from "../../src/server/server";
import * as homeCtrl from "../../src/server/controllers/home";
import { createMockContext } from "./utilities";

describe("apicontrollers/user.ts", () => {
  it("index() should set body", async (done) => {
    const ctx = createMockContext();
    await homeCtrl.index(ctx);
    expect(ctx.body).toContain("Hello, User");
    done();
  });
});

describe("GET /apis/user", () => {
  it("should return 200 OK", (done) => {
    request(server).get("/apis/user").expect(200, done);
  });
});

afterAll(() => {
  console.log("Closing server");
  server.close();
});
