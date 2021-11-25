const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  router.post('/', function(req, res, next) {
    const { email } = req.body;
    getUserByEmail(email)
      .then((user) => res.json({user}))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
