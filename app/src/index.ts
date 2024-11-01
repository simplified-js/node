import { greet } from "./utils.js";

console.log("App started. Press Ctrl+C to exit.");

setInterval(() => {
  console.log(greet("World"));
}, 5000);
