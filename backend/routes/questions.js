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

  router.post('/new', function(req, res, next) {
    const userId = req.currentUser.id; // Should I use the body parser to get the current user?
    const { question, category, option } = req.body;
    addQuestion(userId, question, category)
      .then((question) => res.json(question))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
