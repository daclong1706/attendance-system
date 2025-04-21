import { useState } from "react";
import "./App.css";
import TestConnection from "./test_connection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TestConnection />
    </>
  );
}

export default App;
