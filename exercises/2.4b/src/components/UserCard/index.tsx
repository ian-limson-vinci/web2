import { User } from "../../types";
import "./UserCard.css"

interface UserCardProps {
  user: User;
}

const UserCard = (props: UserCardProps) => (
  <div className="user-card">
    <h1>{props.user.nom}</h1>
    <h2>{props.user.age}</h2>
    <h2 className={props.user.enLigne ? "user-card--online" : "user-card--offline"}>
        {props.user.enLigne ? "En ligne" : "Hors ligne"}</h2>
  </div>
);

export default UserCard;
