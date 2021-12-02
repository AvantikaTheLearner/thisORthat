import HomeItem from "./HomeItem";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home(props) {
  const {currentUser} = props;
  const [userquestions, setUserQuestions] = useState([]);

  useEffect(() => {
    axios.post("/api/questions/forUser", { currentUser }).then((rows) => {
      setUserQuestions(rows.data);
    });
  }, []);

  const parsedQuestions = userquestions.map(question => (<HomeItem
    key={question.id}
    questionId={question.id}
    question={question.question_text}
    handle={question.handle}
    setUserQuestions={setUserQuestions}
    currentUser={currentUser} />
  ));

  return (
  <section>{parsedQuestions}</section>
  );
}