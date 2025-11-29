import type { CSSProperties } from "react";
import "./App.css";

import Button from "./components/Button";

const style: CSSProperties = {
  background: "red",
  color: "green",
};

function App() {
  return (
    <>
      <h1>Notion Clone One</h1>
      <button style={style}>click</button>
      <Button />
    </>
  );
}

export default App;
