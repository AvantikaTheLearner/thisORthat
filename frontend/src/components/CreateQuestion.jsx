import "./CreateQuestion.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuestion(props) {
  const {currentUser} = props;
  const [category, setCategory] = useState(4);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");

  const navigate = useNavigate();

  const newQuestion = function(e) {
    e.preventDefault();
    axios
    .post("/api/questions/new", { question, option, category, currentUser })
    .then((rows) => {
      setQuestion(rows.data);
    });
    navigate('/questions');
  };

  return (
    <div className="createquestion">
      <form>
        <div>
          <label className="createquestion-text">Question</label>
          <input
            alt="Input16"
            name="question"
            type="question"
            onChange={(e) => setQuestion(e.target.value)}
            className="createquestion-image2"
          />
        </div>
        <div>
          <label className="createquestion-text1">First Option</label>
          <input
            alt="Input17"
            name="option"
            type="question"
            onChange={(e) => setOption(e.target.value)}
            className="createquestion-image3"
          />
        </div>
        <div>
          <label className="createquestion-text5">Second Option</label>
          <input
            alt="Input17"
            name="option"
            type="question"
            onChange={(e) => setOption(e.target.value)}
            className="createquestion-image5"
          />
        </div>
        <div>
          <label for="category" className="createquestion-text0">Category</label>
          <select name="category" className="createquestion-image4" onChange={(e) => setCategory(e.target.value)}>
            <option value="1">Movies</option>
            <option value="2">Music</option>
            <option value="3">Books</option>
            <option value="4" selected>
              Fashion
            </option>
            <option value="5">Health</option>
            <option value="6">General Knowledge</option>
            <option value="7">Education</option>
            <option value="8">News</option>
          </select>
        </div>
        <div className="createquestion-primary-button26">
          <button type="submit" className="createquestion-text2" onClick={newQuestion}>
            Submit
          </button>
        </div>
      </form>
      
    </div>
  );
}
