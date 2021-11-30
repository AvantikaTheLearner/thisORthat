import { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionItem.css";
import QuestionOptionsItem from "./QuestionOptionsItem";

export default function QuestionItem(props) {
  const { questionId, question} = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.post("/api/questions/withOptions", { questionId }).then((rows) => {
      setOptions(rows.data);
      console.log("setOptions", options);
    });
  }, []);


  return (
    <QuestionOptionsItem options={options} question={question}/>
  )
}