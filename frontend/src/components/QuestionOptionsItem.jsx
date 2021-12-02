import VISUAL_MODE from "../Constants";
import "./QuestionOptionsItem.css";

export default function QuestionOptionsItem(props) {
  const {options, question, handle, setMode } = props;

  const handleAnswer = function (e) {
    setMode(VISUAL_MODE.ANSWER);
  };

  return (
    <div>
    <article className="all-tweets">
    <header className="tweetHeader">
      <div className="imageclassName">
        <span><i className="fas fa-question-circle"></i></span>
        <span>{question}</span>
      </div>
      <div className="handleName">
        <span>@{handle}</span>
      </div>
    </header>
    <div className="tweetContent">
      {/* <input type="radio" name="option" /> */}
      <ul>
        {options.map(function(option, id) {
          return <li key={ id }>{option.option_text} ({option.selected_count} selects)</li>;
        })}
      </ul>
      {/* <p>{options[0].option_text}</p>*/}
    </div>
    <footer className="tweetFooter">
      {/* <span>${timeago.format(tweetObj.created_at)}</span> */}
      <button class="submitButton" onClick={handleAnswer}>Answer</button>

    </footer>
  </article>
  </div>
  )
}