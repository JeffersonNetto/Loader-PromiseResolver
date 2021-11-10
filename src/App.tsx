import { useEffect, useState } from "react";
import "./styles.css";
import Loader from "./Loader";
import { GetPokemons } from "./service";
import { PokemonResponse } from "./model";

export default function App() {
  const [promise, setPromise] = useState<
    Promise<PokemonResponse | undefined>
  >();

  useEffect(() => {
    setTimeout(() => {
      setPromise(GetPokemons(1118));
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Loader promise={promise}>
        {(pokemons) => (
          <>
            <h1>Pokemon List</h1>

            <div className="pokemon-list">
              {pokemons?.results
                .sort((a, b) => {
                  if (a.name > b.name) {
                    return 1;
                  } else if (a.name < b.name) {
                    return -1;
                  }
                  return 0;
                })
                .map((pokemon, index) => (
                  <p key={index}>{pokemon.name}</p>
                ))}
            </div>
          </>
        )}
      </Loader>
    </div>
  );
}
