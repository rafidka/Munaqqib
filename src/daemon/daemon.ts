import { setup } from "../setup";
setup();

import { checkStatus } from "./indexing";

checkStatus().then(value => {
  console.log(`checkStatus() returned: ${value}.`);
});
