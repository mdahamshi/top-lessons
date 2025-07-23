import { useNavigate } from "react-router";
import './Back.css'
export default function Back() {
  let navigate = useNavigate();
  return (
    <button className="back"
      onClick={() => {
        navigate(-1);
      }}
    >Back</button>
  );
}