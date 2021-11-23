const express = require('express');
const router = express.Router();

module.exports = ({getCategories}) => {
  router.get('/', function(req, res, next) {
    getCategories()
      .then((categories) => res.json(categories))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
