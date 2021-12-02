import { useEffect, useState } from "react";
import axios from "axios";
import QuestionItem from "./QuestionItem";

export default function Myquestions(props) {
  const [questions, setQuestions] = useState([]);
  const {currentUser} = props;

  useEffect(() => {
    axios.get("/api/questions/withhandle").then((rows) => {
      setQuestions(rows.data);
    });
  }, []);
  

  const parsedQuestions = questions.map(question => (<QuestionItem
  key={question.id}
  questionId={question.id}
  question={question.question_text}
  handle={question.handle} />
  ));

  return (
  <div>{parsedQuestions}</div>
  );
}
