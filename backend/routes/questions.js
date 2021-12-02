const express = require('express');
const router = express.Router();

module.exports = ({ getQuestions, getOptionsForQuestion, getUsersQuestions, addQuestion, deleteQuestion, getQuestionsWithHandle, getAnswersForQuestion, populateAnswersInOptions }) => {
  router.get('/', function(req, res, next) {
    getQuestions()
      .then((questions) => res.json(questions))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/withhandle', function(req, res, next) {
    getQuestionsWithHandle()
      .then((questions) => res.json(questions))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/withOptions', function(req, res, next) {
    const questionID = req.body.questionId;
    getOptionsForQuestion(questionID)
      .then((options) => {
        console.log("options for question: ", questionID, " options", options);

        getAnswersForQuestion(questionID)
        .then((answers) => {
          console.log("answers for question:", questionID, " answers: ", answers);
          populateAnswersInOptions(answers, options);

          console.log("options with answers for question: ", questionID, " options", options);
          res.json(options);
        })
        .catch((err) => err);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/delete', function(req, res, next) {
    const questionID = req.body.questionId;

    deleteQuestion(questionID)
      .then((options) => {
        res.json(options);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  router.post('/forUser', function(req, res, next) {
    const userId = req.body.currentUser.id;
    getUsersQuestions(userId)
      .then((questions) => {
        res.json(questions);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  //body parser is used to read the values of the form entered in browser accessing through req.body
  router.post('/new', function(req, res, next) {
    const userId = req.body.currentUser.id;
    const { question, category, firstoption, secondoption } = req.body;
    addQuestion(userId, question, category, firstoption, secondoption)
      .then((question) => {
        res.json(question);
        console.log("New req.body", question);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};


