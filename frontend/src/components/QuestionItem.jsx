import { useEffect, useState } from "react";
import axios from "axios";
import QuestionOptionsItem from "./QuestionOptionsItem";

export default function QuestionItem(props) {
  const { questionId, question, handle } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.post("/api/questions/withOptions", { questionId }).then((rows) => {
      setOptions(rows.data);
    });
  }, []);


  return (
    <QuestionOptionsItem options={options} question={question} handle={handle} />
  )
}