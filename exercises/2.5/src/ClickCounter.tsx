import { useState } from "react";

interface ClickCounterProps {
    title: string,
    on10ClicksMessage: string,
}

const ClickCounter = ({ title, on10ClicksMessage } : ClickCounterProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>{title}</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <br />
      {count >= 10 ? on10ClicksMessage : null}
    </div>
  );
};

export default ClickCounter;
