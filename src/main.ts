import { startREPL } from "./repl.js";

const { createInterface } = require('node:readline');
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:string,
});

function main() {
  startREPL();
}

main();