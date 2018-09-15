import { addPugSupportToContext, PugContext } from "../src/server/server";

/**
 * Creates a mock empty context. This can be useful when we don't want to test
 * against the server directly, e.g. test the controller.
 * @returns {PugContext} A mock empty {@link PugContext}.
 */
export function createMockContext(): PugContext {
  const ctx = <PugContext>{};
  addPugSupportToContext(ctx);
  return ctx;
}
