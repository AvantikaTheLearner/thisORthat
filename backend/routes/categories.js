const express = require('express');
const router = express.Router();

module.exports = ({getCategories, addNewCategory}) => {
  router.get('/', function(req, res, next) {
    getCategories()
      .then((categories) => res.json(categories))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', function(req, res, next) {
    const { category } = req.body;
    addNewCategory(category)
      .then((category) => res.json(category))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};
