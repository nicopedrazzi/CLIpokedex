import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { map, mapb } from "./command_map.js";
import { PokeAPI, ShallowLocations, Location } from "./pokeapi.js";



export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  
  const Registry: Record<string, CLICommand> = {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
        name: "map",
        description: "Display the next 20 locations",
        callback:map,
    },
    mapb: {
        name: "mapb",
        description: "Go back 20 to display the past 20 locations",
        callback: mapb,
    },
  };

  return { readline: rl, commands: Registry, pokeAPI: new PokeAPI(), nextLocationsURL:null, prevLocationsURL: null };
}