import { Person } from "../types";

interface PersonCardProps {
  person: Person;
}

const PersonCard = (props: PersonCardProps) => (
  <div>
    <h2>{props.person.name}</h2>
    <p>Age: {props.person.age}</p>
  </div>
);

export default PersonCard;