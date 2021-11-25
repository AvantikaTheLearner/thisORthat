const express = require('express');
const router = express.Router();

module.exports = ({addUser}) => {
  router.post('/', function(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    addUser(firstName, lastName, email, password)
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
