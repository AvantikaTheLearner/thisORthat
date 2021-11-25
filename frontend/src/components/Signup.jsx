import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import App from "../App";

export default function Signup() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");

  const signup = function(e) {
    e.preventDefault();
    axios
      .post("/api/signup", { firstName, lastName, email, password })
      .then((rows) => {
        setCurrentUser(rows.data);
      });
  };

  return (
    <div>
      <div className="desktop13">
        <img
          src="/Background.png"
          alt="Background13"
          className="desktop13-image"
        />
        <img
          // src="/Container.png"
          // alt="Container14"
          alt=""
          className="desktop13-image1"
        />
        <form>
          <label className="desktop13-firstname">First Name</label>
          <input alt="Input18" name="firstName" onChange={e => setFirstName(e.target.value)} className="desktop13-input-firstname" />
          <label className="desktop13-lastname">Last Name</label>
          <input alt="Input19" name="lastName" onChange={e => setLastName(e.target.value)} className="desktop13-input-lastname" />
          <label className="desktop13-email">E-mail</label>
          <input alt="Input16" name="email" className="desktop13-input-email" onChange={e => setEmail(e.target.value)} />
          <label className="desktop13-password">Password</label>
          <input alt="Input17" type="password" name="password" onChange={e => setPassword(e.target.value)} className="desktop13-input-password" />
          <div className="desktop13-secondary-button32">
            <button type="submit" className="desktop13-create" onClick={signup}>
              CREATE
            </button>
          </div>
        </form>
      </div>
      {currentUser && <App />}
    </div>
  );
}
