import "./HomeOptionsItem.css";
import axios from "axios";

export default function HomeOptionsItem(props) {
  const {options, question, questionId, handle, setUserQuestions, currentUser  } = props;

  const deleteQuestion = function (e) {
    e.preventDefault();
    axios
      .post("/api/questions/delete", { questionId })
      .then((rows) => {
        axios.post("/api/questions/forUser", { currentUser }).then((rows) => {
          setUserQuestions(rows.data);
        });
      });

  };

  let total = 0;
  for (const option of options) {
    total += option.selected_count;
  }

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
            return <li key={ id }>{option.option_text} ({option.selected_count} selects)<div className="progress-bar">
            <div className="filler" style={{ width: `${(option.selected_count === 0 ? 0 : (Math.round(option.selected_count * 100 /total)))}%`}} />
            </div>
            </li>;
                  })}
            </ul>
      {/* <p>{options[0].option_text}</p>*/}
    </div>
    <footer className="tweetFooter">
      {/* <span>${timeago.format(tweetObj.created_at)}</span> */}
      <button class="submitButton" type="submit" onClick={deleteQuestion}>Delete</button>
    </footer>
  </article>
  </div>
  )
}