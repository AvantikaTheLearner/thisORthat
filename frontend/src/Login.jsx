import "./Login.css";
import App from "./App";
import axios from "axios";
import { useState } from "react";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Link, Route, Navigate } from "react-router-dom";

export default function Login() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");

  //onSubmit refreshes the page even if we use preventDefault but onClick does not
  const login = function (e) {
    e.preventDefault();
    axios.post("/api/login", { email }).then((rows) => {
      setCurrentUser(rows.data);
    });
  };

  return (
    <BrowserRouter>
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
            <img src="/Avatar.png" alt="Avatar15" className="desktop12-svg" />
            <input
              alt="Input16"
              name="email"
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
                <button
                  type="submit"
                  className="desktop12-text2"
                  onClick={login}
                >
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
        )}
      </div>
      {currentUser && <App currentUser={currentUser.user} />}
    </BrowserRouter>
  );
}
