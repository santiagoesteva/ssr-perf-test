export async function getServerSideProps({
  params: { count },
}: {
  params: { count: string };
}) {
  const pokemonReq = await fetch(
    `http://127.0.0.1:8080/pokemon-${count}.json`,
    {
      cache: "no-cache",
    }
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const pokemon = await pokemonReq.json();
  return {
    props: {
      pokemon,
    },
  };
}

const Pokemon = ({ pokemon }: { pokemon: Record<string, string> }) => {
  return (
    <>
      {Object.keys(pokemon).map((k) => (
        <div key={[pokemon.id, k].join(",")}>{pokemon[k].toString()}</div>
      ))}
    </>
  );
};

export default function Home({
  pokemon,
}: {
  pokemon: Record<string, string>[];
}) {
  return (
    <main>
      <h1>Pokemon</h1>
      {pokemon.map((p) => (
        <div key={p.id} className="flex flex-row gap-2">
          <Pokemon pokemon={p} />
        </div>
      ))}
    </main>
  );
}
