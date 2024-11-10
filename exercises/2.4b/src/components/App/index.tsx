import UserCard from "../UserCard";
import { User } from "../../types";
import "./App.css";

const App = () => {
  const users: User[] = [
    { nom: "John Doe", age: 25, enLigne: true },
    { nom: "Jane Doe", age: 22, enLigne: false },
    { nom: "Foo Bar", age: 30, enLigne: true },
  ];

  return (
    <div className="app">
      <h1>Users</h1>
      <div className="cards">
        {users.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
