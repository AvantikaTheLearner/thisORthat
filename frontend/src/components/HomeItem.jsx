import { useEffect, useState } from "react";
import axios from "axios";
import HomeOptionsItem from "./HomeOptionsItem";

export default function HomeItem(props) {
  const { questionId, question, handle, setUserQuestions, currentUser } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.post("/api/questions/withOptions", { questionId }).then((rows) => {
      setOptions(rows.data);
      console.log("setOptions", options);
    });
  }, []);


  return (
    <HomeOptionsItem options={options} question={question} handle={handle} questionId={questionId} currentUser={currentUser} setUserQuestions={setUserQuestions} />
  )
}