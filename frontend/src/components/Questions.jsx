import { useEffect, useState } from "react";
import axios from "axios";
import QuestionItem from "./QuestionItem";

export default function Myquestions(props) {
  const {questions, currentUser} = props;

  const parsedQuestions = questions.map(question => (<QuestionItem
  key={question.id}
  questionId={question.id}
  question={question.question_text} />
  ));

  return (
  <div>{parsedQuestions}</div>
  );
}
