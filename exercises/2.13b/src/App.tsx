import { useEffect, useState } from "react";
import Dog from "./Dog";

interface Dog {
  message: string;
  status: string;
}

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Dog key={`${refresh}1`} />
        <Dog key={`${refresh}2`} />
        <Dog key={`${refresh}3`} />
      </div>

      <button
        onClick={() => setRefresh(!refresh)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        Refresh Dogs
      </button>
    </>
  );
};

export default App;