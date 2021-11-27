const express = require('express');
const router = express.Router();

module.exports = ({ getQuestions, addQuestion }) => {
  router.get('/', function(req, res, next) {
    getQuestions()
      .then((questions) => res.json(questions))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  //body parser is used to read the values of the form entered in browser accessing through req.body
  router.post('/new', function(req, res, next) {
    const userId = req.currentUser.id;
    const { question, category, option } = req.body;
    addQuestion(userId, question, category)
      .then((question) => res.json(question))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
