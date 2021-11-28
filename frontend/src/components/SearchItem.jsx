export default function SearchItem(props) {
  return(
    <div>
    <article className="all-tweets">
    <header className="tweetHeader">
      <div className="imageclassName">
        <span><i className="fas fa-question-circle"></i></span>
        <p>{props.question}</p>
      </div>
      <div className="handleName">
        <span>@</span>
      </div>
    </header>
    <div className="tweetContent">
      <input type="radio" name="option" value={props.option} />
      <p>{props.option}</p>
    </div>
    <footer className="tweetFooter">
      {/* <span>${timeago.format(tweetObj.created_at)}</span> */}
    </footer>
  </article>
  </div>
  
  );
}