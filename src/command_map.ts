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