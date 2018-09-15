import { createMockContext } from "../utilities";
import { addPugSupportToContext, default as server } from "../../src/server/server";

describe("server.test.ts", () => {
  it("addPugSupportToContext() injects renderPugView() function", (done) => {
    const ctx = createMockContext();
    addPugSupportToContext(ctx);
    expect(ctx.renderPugView).toBeDefined();
    done();
  });
});

afterAll(() => {
  console.log("Closing server");
  server.close();
});
