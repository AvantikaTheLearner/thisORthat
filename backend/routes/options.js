const express = require('express');
const router = express.Router();

module.exports = ({getOptions}) => {
  router.get('/', function(req, res, next) {
    getOptions()
      .then((options) => res.json(options))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
