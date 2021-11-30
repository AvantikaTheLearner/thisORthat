const express = require('express');
const router = express.Router();

module.exports = ({ getQuestions, getOptionsForQuestion, getQuestionsWithAnswersforUser, addQuestion }) => {
  router.get('/', function(req, res, next) {
    getQuestions()
      .then((questions) => res.json(questions))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/withOptions', function(req, res, next) {
    const questionID = req.body.questionId;
    getOptionsForQuestion(questionID)
      .then((options) => {
        res.json(options);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  router.post('/withanswers', function(req, res, next) {
    const userId = req.body.currentUser.id;
    getQuestionsWithAnswersforUser(userId)
      .then((questions) => res.json(questions))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  //body parser is used to read the values of the form entered in browser accessing through req.body
  router.post('/new', function(req, res, next) {
    const userId = req.body.currentUser.id;
    const { question, category, option } = req.body;
    console.log("New req.body", req.body);
    addQuestion(userId, question, category)
      .then((question) => res.json(question))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
