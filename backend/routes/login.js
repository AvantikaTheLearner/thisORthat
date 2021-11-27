const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  router.post('/', function(req, res, next) {
    const { email } = req.body; //req.body is working here
    getUserByEmail(email)
      .then((user) => {
        req.session.user_id = user.id;
        res.json({user});
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
