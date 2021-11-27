import axios from "axios";
import { useState } from "react";
export default function Search(props) {
  const [searchquestion, setSearchQuestion] = useState([]);
  const [searchtext, setSearchText] = useState("");

  const search = function (e) {
    e.preventDefault();
    axios.post("/api/search", {searchtext}).then((rows) => {
      setSearchQuestion(rows.data);
      console.log("setSearchQuestion", rows.data);
    });
  };
  return (
    <div>
      <form>
        <input
          className="search"
          name="search"
          type="search"
          placeholder="search question by Text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" onClick={search}>
          Search
        </button>
      </form>
      {/* <p>{props.question}</p> */}
    </div>
  );
}
