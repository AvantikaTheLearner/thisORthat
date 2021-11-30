import { useEffect, useState } from "react";
import axios from "axios";
import SearchOptionsItem from "./SearchOptionsItem";

export default function SearchItem(props) {

  const { question } = props;
  const [options, setOptions] = useState([]);
  console.log("props", props.question);

  const questionId = question.id;

  useEffect(() => {
    axios.post("/api/questions/withOptions", { questionId }).then((rows) => {
      setOptions(rows.data);
    });
  }, []);

  return(
    <div>
    {question && <SearchOptionsItem options={options} question={question.question_text} /> }
    </div>
  );
}