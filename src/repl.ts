import readline from "node:readline";


export function cleanInput(input:string):string[]{
    return input .toLowerCase() .split(" ") .filter(Boolean);
}



export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${words[0]}`);
    rl.prompt();
  });
}

