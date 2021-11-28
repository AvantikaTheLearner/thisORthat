const express = require('express');
const router = express.Router();

module.exports = ({searchQuestionByText}) => {
  router.post('/', function(req, res, next) {
    const title = req.body.searchtext;
    searchQuestionByText(title)
      .then((question) => {
        res.json(question);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};