import { checkStatus } from "./indexing";

checkStatus().then(value => {
  console.log(`checkStatus() returned: ${value}.`);
});
