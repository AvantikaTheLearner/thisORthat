const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  router.post('/', function(req, res, next) {
    const { email } = req.body; //req.body is working here
    console.log({email});
    getUserByEmail(email)
      .then((user) => {
        req.session.user_id = user.id;
        console.log("req.session.user_id", req.session.user_id);
        res.json({user});
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
