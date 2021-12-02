import axios from "axios";
import { useState } from "react";
import SearchItem from "./SearchItem";
import "./Search.css";

export default function Search(props) {
  const [searchquestion, setSearchQuestion] = useState(null);
  const [searchtext, setSearchText] = useState("");

  const search = function (e) {
    e.preventDefault();
    axios.post("/api/search", {searchtext}).then((rows) => {
      setSearchQuestion(rows.data);
      console.log("setSearchQuestion", rows.data);
    });
  };

  return (
    <div className="search-container">
      <form className="searchform">
        <input
          className="search"
          name="search"
          type="search"
          placeholder="search question by Text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="searchbutton" onClick={search}>
          Search
        </button>
      </form>
      <div className="searchitem">
        <h2>Searched Results:</h2>
      {searchquestion && <SearchItem question={searchquestion} /> }
      </div>
    </div>
  );
}
