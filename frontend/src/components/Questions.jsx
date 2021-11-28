import { useEffect, useState } from "react";
import axios from "axios";
import QuestionItem from "./QuestionItem";

export default function Myquestions(props) {
  const {questions, currentUser} = props;
  console.log("props", props);

  const parsedQuestions = questions.map(question => (<QuestionItem
  key={question.id}
  question={question.question_text}
  option={question.option_text}
  handle={question.handle} />
  ));

  return (
  <p>{parsedQuestions}</p>
  );
}
