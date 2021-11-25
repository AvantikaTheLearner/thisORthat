import "./Login.css";
import App from "./App";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signup = function (e) {
    e.preventDefault();
    axios
      .post("/api/signup", { firstName, lastName, email, password })
      .then((rows) => {
        setCurrentUser(rows.data);
      });
  };

  //onSubmit refreshes the page even if we use preventDefault but onClick does not
  const login = function (e) {
    e.preventDefault();
    axios.post("/api/login", { email }).then((rows) => {
      setCurrentUser(rows.data);
    });
  };

  return (
    <div>
      {!currentUser && (
        <div className="desktop12">
          <img
            src="/Background.png"
            alt="Background13"
            className="desktop12-image"
          />
          <img
            // src="/Container.png"
            // alt="Container14"
            alt=""
            className="desktop12-image1"
          />
          <img
            // src="/Container.png"
            // alt="Container14"
            alt=""
            className="desktop13-image1"
          />
          <img src="/Avatar.png" alt="Avatar15" className="desktop12-svg" />
          <form>
            <label className="desktop12-text">E-mail</label>
            <input
              alt="Input16"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="desktop12-image2"
            />
            <label className="desktop12-text1">Password</label>
            <input
              alt="Input17"
              type="password"
              name="password"
              className="desktop12-image3"
            />
            <div className="desktop12-primary-button26">
              <button type="submit" className="desktop12-text2" onClick={login}>
                Sign In
              </button>
            </div>
          </form>
          <form>
            <label className="desktop13-firstname">First Name</label>
            <input
              alt="Input18"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              className="desktop13-input-firstname"
            />
            <label className="desktop13-lastname">Last Name</label>
            <input
              alt="Input19"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="desktop13-input-lastname"
            />
            <label className="desktop13-email">E-mail</label>
            <input
              alt="Input16"
              name="email"
              className="desktop13-input-email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="desktop13-password">Password</label>
            <input
              alt="Input17"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="desktop13-input-password"
            />
            <div className="desktop13-secondary-button32">
              <button
                type="submit"
                className="desktop13-create"
                onClick={signup}
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      )}
      {currentUser && <App />}
    </div>
  );
}
