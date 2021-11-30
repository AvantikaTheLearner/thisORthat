import "./HomeOptionsItem.css";

export default function HomeOptionsItem(props) {
  const {options, question } = props;

  return (
    <div>
    <article className="all-tweets">
    <header className="tweetHeader">
      <div className="imageclassName">
        <span><i className="fas fa-question-circle"></i></span>
        <span>{question}</span>
      </div>
      <div className="handleName">
        {/* <span>@{props.handle}</span> */}
      </div>
    </header>
    <div className="tweetContent">
      {/* <input type="radio" name="option" /> */}
      <ul>
                {options.map(function(option, id){
                    return <li key={ id }>{option.option_text}</li>;
                  })}
            </ul>
      {/* <p>{options[0].option_text}</p>*/}
    </div>
    <footer className="tweetFooter">
      {/* <span>${timeago.format(tweetObj.created_at)}</span> */}
    </footer>
  </article>
  </div>
  )
}