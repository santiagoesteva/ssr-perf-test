
function wrapPromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );
  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };
  return { read };
}

function getData(count) {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      fetch(`http://127.0.0.1:8080/pokemon-${count}.json`, {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then(resolve);
    }, 3000);
  });

  return wrapPromise(promise);
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

const resource = getData(1500);

export function Pokemons() {
  const pokemon = resource.read();

  return (
    <>
      {pokemon.map((p) => (
        <div key={p.id} className="flex flex-row gap-2">
          <Pokemon pokemon={p} />
        </div>
      ))}
    </>
  );
}
