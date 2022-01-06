import React, { useState, useMemo } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(true);

  /**
   * A slow function that is always called on
   * a rerender can significantly slow down the
   * whole application.
   */
  //const doubleNumber = slowFunction(number);

  /**
   * Therefore it can make sense to wrap
   * the function inside the useMemo hook.
   * Here the return value of the function
   * is cached until the value actually changes.
   * But it can cause some memory overhead,
   * therefore it should not be exaggerately
   * used everywhere.
   */
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const themeStyles = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };

  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark(!dark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
}

function slowFunction(num) {
  console.log("calling slow function");

  let startTime = performance.now();
  for (let i = 0; i < 1000000000; i++) {}
  let endTime = performance.now();

  console.log(`This function took ${endTime - startTime} milliseconds`);

  return num * 2;
}

export default App;
