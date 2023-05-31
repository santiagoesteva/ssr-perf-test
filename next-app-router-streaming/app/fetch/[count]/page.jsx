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

const Pokemon = ({ pokemon }) => {
  // console.log({ pokemon });
  return (
    <>
      {Object.keys(pokemon).map((k) => (
        <div key={[pokemon.id, k].join(",")}>{pokemon[k].toString()}</div>
      ))}
    </>
  );
};

async function Pokemons({ count }) {
  const data = await getData({ count });

  return (
    <div>
      <h3>Pokemons</h3>
      {data &&
        data.map((p) => {
          return (
            <div key={p.id} className="flex flex-row gap-2">
              <Pokemon pokemon={p} />
            </div>
          );
        })}
    </div>
  );
}

export default async function Home({ params: { count } }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Pokemons count={count} />
      </Suspense>
    </>
  );
}
