import { useState } from "react";

interface ClickCounterProps {
    title: string,
    on10ClicksMessage: string,
}

const ClickCounter = ({ title, on10ClicksMessage } : ClickCounterProps) => {
  const [count, setCount] = useState(0);

  const[mouseOn, setMouseOn] = useState(false);

  const handleMouseOn = () => {
    setMouseOn(true);
  }

  const handleMouseOff = () => {
    setMouseOn(false);
  }

  return (
    <div className="card">
      <h1>{title}</h1>
      {mouseOn ? <p>Please click on me now !</p> : null}
      <button
        onClick={() => setCount((count) => count + 1)}
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOff}
      >
        count is {count}
      </button>
      <br />
      {count >= 10 ? on10ClicksMessage : null}
    </div>
  );
};

export default ClickCounter;
