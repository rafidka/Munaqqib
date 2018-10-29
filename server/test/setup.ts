if (!process.env) {
  process.env = {};
}
console.log("Setting NODE_ENV process environment variable to 'test'.");
process.env.NODE_ENV = "test";
