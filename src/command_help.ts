import type { State } from "./state.js";

export function commandHelp(state: State) {
  console.log("Available commands:");
  for (const command of Object.values(state.commands)) {
    console.log(`- ${command.name}: ${command.description}`);
  }
}