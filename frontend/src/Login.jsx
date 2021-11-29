import "./Login.css";
import App from "./App";
import axios from "axios";
import { useState } from "react";
import Signup from "./components/Signup";
// import { useAuth, AuthProvider, useAuthProvider } from "./AuthProvider";
// import { useNavigate, useLocation, Navigate } from "react-router-dom";
import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate
} from "react-router-dom";
import { useAuthProvider, AuthProvider, useAuth } from "./AuthProvider";

export default function Login() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  //onSubmit refreshes the page even if we use preventDefault but onClick does not
  const login = function (e) {
    // e.preventDefault();
    axios.post("/api/login", { email }).then((rows) => {
      setCurrentUser(rows.data);
      navigate(`/home`);
      // <Navigate to="/home" state={{ from: location }} />;
    });
  };

  //------------------------------------------------------------------
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email");
    console.log("email", email);

    auth.signin(email, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }
  //------------------------------------------------------------------------------

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
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
        <img src="/Avatar.png" alt="Avatar15" className="desktop12-svg" />
        <input
          alt="Input16"
          name="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="desktop12-image2"
        />
        <input
          alt="Input17"
          type="password"
          name="password"
          className="desktop12-image3"
        />
        <form>
          <label className="desktop12-text">E-mail</label>
          <label className="desktop12-text1">Password</label>
          <div className="desktop12-primary-button26">
            <button className="desktop12-text2" onClick={useAuthProvider().signin(login)}>
              Sign In
            </button>
          </div>
          <div className="desktop12-secondary-button32">
            <button
              type="submit"
              className="desktop12-text3"
              onClick={() => <Navigate to="/signup" />}
            >
              CREATE ACCOUNT
            </button>
            <Routes>
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </form>
      </div>
    </div>
    //{currentUser && <App currentUser={currentUser.user} />}
  );
}
