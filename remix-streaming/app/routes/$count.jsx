// index.js

import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

async function getData({ count }) {
  const res = await fetch(`http://127.0.0.1:8080/pokemon-${count}.json`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return res.json();
}

export async function loader({ params }) {
  const { count } = params;
  const pokemonPromise = getData({ count });
  return defer({
    pokemon: pokemonPromise,
  });
}

const Pokemon = ({ pokemon }) => {
  return (
    <>
      {Object.keys(pokemon).map((k) => (
        <div key={[pokemon.id, k].join(",")}>{pokemon[k].toString()}</div>
      ))}
    </>
  );
};

export default function Index() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Pokemon</h1>
      <Suspense fallback={<p>Loading pokemons...</p>}>
        <Await
          resolve={data.pokemon}
          errorElement={<p>Error loading pokemons!</p>}
        >
          {(pokemon) => (
            <>
              {pokemon.map((p) => (
                <div key={p.id} className="flex flex-row gap-2">
                  <Pokemon pokemon={p} />
                </div>
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
