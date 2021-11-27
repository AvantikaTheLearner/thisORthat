const express = require('express');
const router = express.Router();

module.exports = ({searchQuestionByText}) => {
  router.get('/', function(req, res, next) {
    const { search } = req.body;
    console.log("req.body", req.body);
    searchQuestionByText(search)
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