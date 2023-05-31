import { Pokemons } from "./Pokemons";
import { Suspense } from "react";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Pokemon title header</h1>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Pokemons />
        </Suspense>
      </main>
      <footer>Some footer</footer>
    </>
  );
}

export default App;
