import './Signup.css';

export default function Signup() {

  return (
    <div>
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
        <input alt="Input18" className="desktop12-image4" />
        <input alt="Input19" className="desktop12-image5" />
        <input alt="Input16" className="desktop12-image2" />
        <input alt="Input17" className="desktop12-image3" />
        <form>
          <label className="desktop12-text5">First Name</label>
          <label className="desktop12-text4">Last Name</label>
          <label className="desktop12-text">E-mail</label>
          <label className="desktop12-text1">Password</label>
          <div className="desktop12-secondary-button32">
            <span className="desktop12-text3">
              <a href="/signup">CREATE</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}