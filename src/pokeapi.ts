import { Cache } from "./pokecache.js";

export class PokeAPI {
  cache = new Cache(10_000);
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    if (this.cache.get(url)){
      return this.cache.get(url) as ShallowLocations;
    }
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }
    let response = await res.json()
    this.cache.add(url,response);
    return (await response) as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    if (this.cache.get(url)){
      return this.cache.get(url) as Location;
    }
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }
    let response = await res.json()
    this.cache.add(url,response)
    return (response) as Location;
  };

    async fetchLocationArea(areaName: string) {
    const url = `https://pokeapi.co/api/v2/location-area/${areaName}`;

    const cached = this.cache.get(url);
    if (cached) return cached.val;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    this.cache.add(url, data);
    return data;
  };

  async catchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    const cached = this.cache.get(url);
    if (cached) return cached.val;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    this.cache.add(url, data);
    return data;
  };
  
}


export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Location = {
  id: number;
  name: string;
};

export type Pokemon = {
  name: string;
  base_experience: number;
};
