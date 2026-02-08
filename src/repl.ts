export function cleanInput(input:string):string[]{
    return input .toLowerCase() .split(" ") .filter(Boolean);
}

export function startREPL(){


const { createInterface } = require('node:readline');
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:string,
  
  rl.on('line', (line) => {
    if (!line){
        rl.prompt;
    };
    cleanInput(line);
  console.log(`Received: ${line}`);
});
});
}

