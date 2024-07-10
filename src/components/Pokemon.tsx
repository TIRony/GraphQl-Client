import { useAppDispatch } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { fetchPokemon } from "@/services/pokemonService";
import { useState } from "react";
import { useSelector } from "react-redux";

const Pokemon = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const { pokemon, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchPokemon(name));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Pokémon name"
          className="p-4 bg-black"
        />
        <button type="submit">Fetch Pokémon</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>Types: {pokemon.types.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
