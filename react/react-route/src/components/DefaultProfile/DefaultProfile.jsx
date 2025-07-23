import Back from "../Back/Back";
import { Link } from "react-router-dom";
import './DefaultProfile.css'

const profiles = [
  { name: "spinach", label: "Spinach" },
  { name: "popeye", label: "Popeye" },
];
const DefaultProfile = () => {
  return (
    <>
    <h2>Here is a list of profiles:</h2>
          <ul className="profiles">
        {profiles.map((profile) => (
          <li key={profile.name}>
            <Link to={`/profile/${profile.name}`}>
              {profile.label} Profile Page
            </Link>
          </li>
        ))}
      </ul>
    <Back />
    </>
);
};

export default DefaultProfile;
