import HomeItem from "./HomeItem";

export default function Home(props) {
  const {questions} = props;

  const parsedQuestions = questions.map(question => (<HomeItem
    key={question.id}
    questionId={question.id}
    question={question.question_text}
    handle={question.handle} />
  ));

  return (
  <p>{parsedQuestions}</p>
  );
}