const express = require('express');
const router = express.Router();

module.exports = ({searchQuestionByText}) => {
  router.post('/', function(req, res, next) {
    const title = req.body.search;
    console.log("req.body", req.body);
    searchQuestionByText(title)
      .then((question) => {
        console.log("searchquestion", question);
        res.json(question);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};