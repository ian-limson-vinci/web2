import { Person } from "../types";
import PageTitle from "./PageTitle";
import Footer from "./Footer";
import PersonCard from "./PersonCard";

const App = () => {
    const pageTitle = "Welcome to My App";
    const people: Person[] = [
        {
            name: "Alice",
            age: 25
        },
        {
            name: "Bob",
            age: 32
        },
        {
            name: "Charlie",
            age: 35
        }
    ]
    const footerText = "© 2023 My App";

  
    return (
      <div>
        <PageTitle title={pageTitle} />
        {people.map((person) => (
            <PersonCard person={person} />
        ))}
        <Footer text={footerText} />
      </div>
    );
  };
  
  export default App;