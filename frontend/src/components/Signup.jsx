import "./Signup.css";

export default function Signup() {
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
          <input alt="Input18" className="desktop13-input-firstname" />
          <label className="desktop13-lastname">Last Name</label>
          <input alt="Input19" className="desktop13-input-lastname" />
          <label className="desktop13-email">E-mail</label>
          <input alt="Input16" className="desktop13-input-email" />
          <label className="desktop13-password">Password</label>
          <input alt="Input17" className="desktop13-input-password" />
          <div className="desktop13-secondary-button32">
            <button type="submit" className="desktop13-create">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
