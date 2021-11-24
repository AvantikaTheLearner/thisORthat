import './Login.css';
import App from './App';
import axios from "axios";
import { useState } from 'react';

export default function Login() {
  const [currentUser, setCurrentUser] = useState(null);

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
          <img src="/Avatar.png" alt="Avatar15" className="desktop12-svg" />
          <input alt="Input16" className="desktop12-image2" />
          <input alt="Input17" className="desktop12-image3" />
          <form>
            <label className="desktop12-text">E-mail</label>
            <label className="desktop12-text1">Password</label>
            <div className="desktop12-primary-button26">
              <span className="desktop12-text2">
                <a href="/home">Sign In</a>
              </span>
            </div>
            <div className="desktop12-secondary-button32">
              <span className="desktop12-text3">
                <a href="/signup">CREATE ACCOUNT</a>
              </span>
            </div>
          </form>
        </div>
      )}
      {currentUser && <App />}
      {/* <div className="loginbutton">
        {!currentUser && (
          <button onClick={() => setCurrentUser({ name: "bob" })}>Submit</button>
        )}
      </div> */}
    </div>
  );
}