const express = require('express');
const router = express.Router();

module.exports = ({getQuestions}) => {
  router.get('/', function(req, res, next) {
    getQuestions()
      .then((questions) => res.json(questions))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
