import { State } from "./state.js";

export async function map(state:State): Promise<void>{
    const data = await state.pokeAPI.fetchLocations(state.nextLocationsURL ?? undefined);

  for (const loc of data.results) {
    console.log(loc.name);
  }
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
};



export async function mapb(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }
  const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  for (const loc of data.results) {
    console.log(loc.name);
  }

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
}

export async function commandExplore(state: State, areaName?: string): Promise<void> {
  if (!areaName) {
    console.log("Usage: explore <area_name>");
    return;
  }
  console.log(`Exploring ${areaName}...`);

  const data = await state.pokeAPI.fetchLocationArea(areaName);

  console.log("Found Pokemon:");
  for (const enc of data.pokemon_encounters) {
    console.log(` - ${enc.pokemon.name}`);
  }
}

export async function commandCatch(state: State, pokemonName?: string): Promise<void>{
  if (!pokemonName){
    console.log("Usage: catch <pokemon_name>");
    return;
  };
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const data = await state.pokeAPI.catchPokemon(pokemonName);
  const baseExp = data.base_experience ?? 0;
  const catchChance = Math.max(0.1, 1 - baseExp / 300);
  const roll = Math.random();

  if (roll < catchChance) {
    console.log(`${data.name} was caught!`);
    state.pokedex[data.name] = data;
  } else {
    console.log(`${data.name} escaped!`);
  }
}
