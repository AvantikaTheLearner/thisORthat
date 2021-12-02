import { useState } from "react";
import VISUAL_MODE from "../Constants";
import "./AnswerForm.css";
const ERROR_MSG_OPTION_MUST_BE_SELECTED = "Error: Option must be selected to submit answer!";
export default function AnswerForm(props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [customSuggestion, setCustomSuggestion] = useState('');
  const [error, setError] = useState("");
  const {options, question, handle, setMode, answerQuestion } = props;

  const handleAnswer = function (e) {
    e.preventDefault();
    if (!selectedOption) {
      setError(ERROR_MSG_OPTION_MUST_BE_SELECTED);
      return;
    }

    // validation passed so clear any prev error from error state
    setError("");
    answerQuestion(selectedOption, customSuggestion);
    setMode((prev) => VISUAL_MODE.SHOW);
  };

  const handleCancel = function (e) {
    e.preventDefault();
    setMode(VISUAL_MODE.SHOW);
  };

  const handleOptionClick = function(id) {
    setError("");
    console.log("Option clicked: ", id);
    setSelectedOption((prev) => id);
    console.log("selectedOption state: ", selectedOption);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const customSuggestionInput = event.target.value;
    console.log({ customSuggestionInput });
    setCustomSuggestion((prev) => customSuggestionInput);
  };

  return (
    <div>
    <article className="all-tweets">
    <header className="tweetHeader">
      <div className="imageclassName">
        <span><i className="fas fa-question-circle"></i></span>
        <span><h3>{question}</h3></span>
      </div>
      <div className="handleName">
        <span>@{handle}</span>
      </div>
    </header>
    <div className="tweetContent">
      {/* <input type="radio" name="option" /> */}
      <section className="appointment__validation">{error}</section>
      <ul>
        {options.map(function(option, id) {
          // return <li
          //   key={ id }
          //   onClick={() => handleOptionClick(option.id)}
          //   >{option.option_text} (selected count: {option.selected_count}) </li>;
            return <div className="form-check">
              <label>
                <input
                  key={ id }
                  type="radio"
                  name={option.option_text}
                  value={option.id}
                  checked={selectedOption === '' ? false : selectedOption === option.id}
                  onChange={() => (option.id)}
                  onClick={() => handleOptionClick(option.id)}
                  className="form-check-input"
                />
                {option.option_text}
              </label>
              <br /><br/>
            </div>;
        })}
      </ul>
      {/* <p>{options[0].option_text}</p>*/}
      <input
        data-testid="student-name-input"
        className="custom_suggestion__create-input text--semi-bold"
        name="name"
        type="text"
        value={customSuggestion}
        placeholder="Enter suggestion, if any..."
        required
        onChange={handleInputChange}
      />
    </div>
    <footer className="tweetFooter">
      {/* <span>${timeago.format(tweetObj.created_at)}</span> */}
      <button class="submitButton" onClick={handleAnswer}>Submit</button>
      <button class="button--danger" onClick={handleCancel}>Cancel</button>

    </footer>
  </article>
  </div>
  )
}