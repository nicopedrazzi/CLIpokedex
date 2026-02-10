import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { map, mapb, commandExplore, commandCatch, commandInspect, commandPokedex } from "./command_map.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";




export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
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
    explore: {
    name: "explore",
    description: "Explore a location area and list Pokémon found there",
    callback: commandExplore,
  },
    catch: {
      name: "catch",
      description: "Catch a Pokemon and add it to your Pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Describe the selected pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List your pokedex",
      callback: commandPokedex,
    }
  };

  return {
    readline: rl,
    commands: Registry,
    pokeAPI: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}
