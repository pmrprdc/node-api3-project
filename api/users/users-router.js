const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async(req, res) => {
   const allUsers = await Users.get();
   res.status(200).json(allUsers)
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', async(req, res) => {
  const current = await Users.getById(req.params.id)
  res.status(400).json(current)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;
