export const GetPokemons = (limit: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  return fetch(url).then((res) => res.json());
};
