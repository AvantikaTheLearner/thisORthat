import { useEffect, useState } from "react";
import axios from "axios";
import HomeItem from "./HomeItem";

export default function Home(props) {
  const {questions} = props;

  const parsedQuestions = questions.map(question => (<HomeItem
  key={question.id}
  question={question.question_text}
  option={question.option_text}
  handle={question.handle} />
  ));

  return (
  <p>{parsedQuestions}</p>
  );
}