import "./CreateQuestion.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuestion(props) {
  const { currentUser, categories } = props;
  const [category, setCategory] = useState(4);
  const [question, setQuestion] = useState("");
  const [firstoption, setFirstOption] = useState("");
  const [secondoption, setSecondOption] = useState("");

  const navigate = useNavigate();

  const newQuestion = function (e) {
    e.preventDefault();
    axios
      .post("/api/questions/new", { question, firstoption, secondoption, category, currentUser })
      .then((rows) => {
        setQuestion(rows.data);
      });
    navigate("/home");
  };

  return (
    <div className="createquestion">
      <form>
          <label className="createquestion-text">Question</label>
          <input
            alt="Input16"
            name="question"
            type="question"
            onChange={(e) => setQuestion(e.target.value)}
            className="createquestion-image2"
          />
          <label className="createquestion-text1">First Option</label>
          <input
            alt="Input17"
            name="firstOption"
            type="text"
            onChange={(e) => setFirstOption(e.target.value)}
            className="createquestion-image3"
          />
          <label className="createquestion-text5">Second Option</label>
          <input
            alt="Input17"
            name="secondOption"
            type="text"
            onChange={(e) => setSecondOption(e.target.value)}
            className="createquestion-image5"
          />
          <label for="category" className="createquestion-text0">
            Category
          </label>
          <select
            name="category"
            className="createquestion-image4"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(function (category, id) {
              return <option value={id}>{category.name}</option>;
            })}
          </select>
        <div className="createquestion-primary-button26">
          <button
            type="submit"
            className="createquestion-text2"
            onClick={newQuestion}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
