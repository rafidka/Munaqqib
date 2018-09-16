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

describe("PUT /apis/services/:id", () => {
  it("should return 400 Bad Request when :id is not a valid integer", (done) => {
    request(server).put("/apis/services/abcd")
      .send({
        url: "http://test.com/service",
        indexName: "index",
        typeName: "type"
      })
      .expect(400, done)
      .expect({errorMessage: "Invalid ID: abcd."});
  });

  it("should return 404 Bad Request when no service has the given :id", (done) => {
    request(server).put("/apis/services/1000")
      .send({
        url: "http://test.com/service",
        indexName: "index",
        typeName: "type"
      })
      .expect(404, done)
      .expect({errorMessage: "No service with ID: 1000."});
  });

  // Note: The URL is invalid actually (there is no service with ID 1000) but
  // the ID validation comes after the input validation.
  it("should return 400 Bad Request when 'url' field is not set", (done) => {
    request(server).put("/apis/services/1000")
      .send({
        indexName: "index",
        typeName: "type"
      })
      .expect(400, done)
      .expect({errorMessage: "Field 'url' is not specified."});
  });

  // Note: The URL is invalid actually (there is no service with ID 1000) but
  // the ID validation comes after the input validation.
  it("should return 400 Bad Request when 'indexName' field is not set", (done) => {
    request(server).put("/apis/services/1000")
      .send({
        url: "http://test.com/service",
        typeName: "type"
      })
      .expect(400, done)
      .expect({errorMessage: "Field 'indexName' is not specified."});
  });

  // Note: The URL is invalid actually (there is no service with ID 1000) but
  // the ID validation comes after the input validation.
  it("should return 400 Bad Request when 'typeName' field is not set", (done) => {
    request(server).put("/apis/services/1000")
      .send({
        url: "http://test.com/service",
        indexName: "index",
      })
      .expect(400, done)
      .expect({errorMessage: "Field 'typeName' is not specified."});
  });

  it("should return 200 OK and update service if the request is valid", async (done) => {
    const INIT = {
      url: "http://test.com/service",
      indexName: "index",
      typeName: "type"
    };

    const AFTER_UPDATE = {
      url: "http://test.com/service-updated",
      indexName: "index-updated",
      typeName: "type-updated"
    };

    const response = await request(server).post("/apis/services").send(INIT);
    const service = response.body;

    const putResponse = await request(server).put("/apis/services/" + service.id)
      .send(AFTER_UPDATE)
      .expect(200);
    let serviceAfterUpdate = putResponse.body;

    // Ensure that the response returned from PUT is updated.
    expect(serviceAfterUpdate.url).toEqual(AFTER_UPDATE.url);
    expect(serviceAfterUpdate.indexName).toEqual(AFTER_UPDATE.indexName);
    expect(serviceAfterUpdate.typeName).toEqual(AFTER_UPDATE.typeName);

    // Retrieve the service using GET and ensure it is updated.
    const getResponse = await request(server).get("/apis/services/" + service.id);
    serviceAfterUpdate = getResponse.body;

    expect(serviceAfterUpdate.url).toEqual(AFTER_UPDATE.url);
    expect(serviceAfterUpdate.indexName).toEqual(AFTER_UPDATE.indexName);
    expect(serviceAfterUpdate.typeName).toEqual(AFTER_UPDATE.typeName);

    done();
  });
});

afterAll(() => {
  console.log("Closing server");
  server.close();
});
