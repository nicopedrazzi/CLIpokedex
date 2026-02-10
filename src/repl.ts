
import { initState, type State, type CLICommand } from "./state.js";


export async function startREPL() {
  const appState: State = initState();
  console.log("Welcome to the Pokedex!");
  appState.readline.prompt();

  appState.readline.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      appState.readline.prompt();
      return;
    }

    const commandName = words[0] as string;
    const commands: Record<string, CLICommand> = appState.commands;
    const cmd = commands[commandName];

    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`,
      );
      appState.readline.prompt();
      return;
    }

    try {
      await cmd.callback(appState);
    } catch (e) {
      console.log(e);
    }
    appState.readline.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}
