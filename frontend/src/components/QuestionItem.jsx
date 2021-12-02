import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import QuestionOptionsItem from "./QuestionOptionsItem";
import VISUAL_MODE from "../Constants";
import AnswerForm from "./AnswerForm";


export default function QuestionItem(props) {
  const [options, setOptions] = useState([]);
  const [mode, setMode] = useState(VISUAL_MODE.SHOW);
  const { questionId, question, handle, setQuestions, currentUser } = props;

  useEffect(() => {
    axios.post("/api/questions/withOptions", { questionId }).then((rows) => {
      setOptions(rows.data);
    });
  }, []);

  const answered_by = currentUser.id;
  const question_id = questionId;
  // let custom_suggestion = "";
  // let selected_option = 1;

  const answerQuestion = function (selected_option, custom_suggestion) {

    axios
      .post("/api/answers", { answered_by, question_id, selected_option, custom_suggestion })
      .then((rows) => {
        console.log(rows);
        const ans = rows.data;
        const newOps = [];
        for (const option of options) {
          if(option.id === ans.selected_option) {
            const op = {...option, selected_count: 1 + option.selected_count};
            console.log("Updated option: ", op);
            newOps.push(op);
          } else {
            newOps.push(option);
          }
        }
        console.log(newOps);
        setOptions(prev => newOps);
      })
      .catch((err) => {console.log(err);});

  };

  return (
    <Fragment>
      { (
        (mode === VISUAL_MODE.SHOW) ? <QuestionOptionsItem
            options={options}
            question={question}
            handle={handle}
            questionId={questionId}
            currentUser={currentUser}
            setQuestions={setQuestions}
            setMode={setMode}
          />
          : (mode === VISUAL_MODE.ANSWER) ? <AnswerForm
          options={options}
          question={question}
          handle={handle}
          questionId={questionId}
          currentUser={currentUser}
          answerQuestion={answerQuestion}
          setMode={setMode}
        />
          : {}
        )
      }
    </Fragment>
  );
}