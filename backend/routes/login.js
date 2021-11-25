const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  router.post('/', function(req, res, next) {
    const { email } = req.body;
    getUserByEmail(email)
      .then((user) => {
        req.session.user_id = user.id;
        res.json({user});
        console.log("user", user);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
