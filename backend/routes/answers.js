const express = require('express');
const router = express.Router();

module.exports = ({
  addAnswer,
  getAnswersForUser,
  getAnswersForOtherThanThisUser,
  getAnswers,
  getAnswersForQuestion }) => {
  router.post('/', function(req, res, next) {
    console.log("handler for POST /api/answers req.body", req.body);

    const answered_by_user = req.session.user_id || req.body.currentUser.id;
    const { question_id, selected_option, custom_suggestion } = req.body;
    addAnswer(answered_by_user, question_id, selected_option, custom_suggestion)
      .then((answer) => res.json(answer))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};