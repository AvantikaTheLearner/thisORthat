const express = require('express');
const router = express.Router();
const {
  getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  getUsersQuestions
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/questions/:id', (req, res) => {
    const id = req.params.id;
    getUsersQuestions(id)
      .then((usersPosts) => {
        //const formattedPosts = getPostsByUsers(usersPosts);
        //console.log("usersPosts", usersPosts);
        res.json(usersPosts);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', (req, res) => {

    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    getUserByEmail(email)
      .then(user => {

        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists'
          });
        } else {
          return addUser(first_name, last_name, email, password);
        }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));

  });

  return router;
};