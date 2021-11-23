import axios from 'axios';
import App from './App';
import './Login.css';

export default function Login() {

  return (
    <div>
      <h1>Login</h1>
      <hr></hr>
      <form className="login">
        <div className="email">
          <label for="input">Email</label>
          <input placeholder="emailid" type="email"></input>
        </div>
        <div className="password">
          <label for="password">Password</label>
          <input placeholder="password" type="password"></input>
        </div>
        <div />
      </form>
    </div>
  );
}