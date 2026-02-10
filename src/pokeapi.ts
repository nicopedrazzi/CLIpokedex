import { Cache } from "./pokecache.js";

export class PokeAPI {
  cache = new Cache(10_000);
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }
    const response = (await res.json()) as ShallowLocations;
    this.cache.add(url, response);
    return response;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }
    const response = (await res.json()) as Location;
    this.cache.add(url, response);
    return response;
  };

  async fetchLocationArea(areaName: string): Promise<LocationArea> {
    const url = `https://pokeapi.co/api/v2/location-area/${areaName}`;

    const cached = this.cache.get<LocationArea>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as LocationArea;

    this.cache.add(url, data);
    return data;
  };

  async catchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Pokemon;

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

export type LocationArea = {
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
    };
  }>;
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
};
