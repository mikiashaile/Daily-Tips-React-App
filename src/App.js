import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice} disabled={count >= 10}>
        Get Advice
      </button>
      <DisplayMessage count={count} />
    </div>
  );
}

function DisplayMessage(props) {
  return (
    <p>
      You recieved <strong>{props.count}</strong> so far. Your daily limit is
      10.
    </p>
  );
}
