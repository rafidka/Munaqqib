import request from "supertest";
import server, { addPugSupportToContext, PugContext } from "../../src/server/main";
import * as homeCtrl from "../../src/server/controllers/home";

/**
 * Creates a mock empty context. This can be useful when we don't want to test
 * against the server directly, e.g. test the controller.
 * @returns {PugContext} A mock empty {@link PugContext}.
 */
function createMockContext(): PugContext {
  const ctx = <PugContext>{};
  addPugSupportToContext(ctx);
  return ctx;
}

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
