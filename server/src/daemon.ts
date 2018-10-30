import { setup, startAsync } from "./setup";
setup();

import { checkStatus } from "./indexing";

startAsync(async () => {
  const value = await checkStatus();
  console.log(`checkStatus() returned: ${value}.`);
});
