import request from "supertest";
import server from "../../src/server/server";
import * as homeCtrl from "../../src/server/controllers/home";
import { createMockContext } from "../utilities";

describe("apicontrollers/user.ts", () => {
  it("index() should set body", async (done) => {
    const ctx = createMockContext();
    await homeCtrl.index(ctx);
    expect(ctx.body).toContain("Hello, User");
    done();
  });
});

describe("GET /apis/services", () => {
  it("should return 200 OK", (done) => {
    request(server).get("/apis/services").expect(200, done);
  });
});

describe("POST /apis/services", () => {
  it("should return 400 Bad Request when 'url' field is not set", (done) => {
    request(server).post("/apis/services")
      .send({
        indexName: "index",
        typeName: "type"
      })
      .expect(400, done)
      .expect({errorMessage: "Field 'url' is not specified."});
  });

  it("should return 400 Bad Request when 'indexName' field is not set", (done) => {
    request(server).post("/apis/services")
      .send({
        url: "index",
        typeName: "type"
      })
      .expect(400, done)
      .expect({errorMessage: "Field 'indexName' is not specified."});
  });

  it("should return 400 Bad Request when 'typeName' field is not set", (done) => {
    request(server).post("/apis/services")
      .send({
        url: "http://test.com/service",
        indexName: "index"
      })
      .expect(400, done)
      .expect({errorMessage: "Field 'typeName' is not specified."});
  });

  it("should return 201 Created when 'typeName' field is not set", (done) => {
    request(server).post("/apis/services")
      .send({
        url: "http://test.com/service",
        indexName: "index",
        typeName: "type"
      })
      .expect(201, done);
  });
});

afterAll(() => {
  console.log("Closing server");
  server.close();
});
