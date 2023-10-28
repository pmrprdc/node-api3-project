const express = require('express');
const {
  validatePost,
  validateUser,
  validateUserId,
  logger
} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
// The middleware functions also need to be required
const router = express.Router();



router.get('/', async(req, res) => {
   const allUsers = await Users.get();
   res.status(200).json(allUsers)
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id',validateUserId, async(req, res) => {
 
  const currentUser = await Users.getById(req.params.id)
  res.status(400).json(currentUser)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', async(req, res) => {
    const { name } = req.body;
    if(!name){
     return res.status(400).json(
        {
          message: "missing required name"
        }
      )
    }


  try {
    const updated = await Users.insert(req.body);
    res.status(201).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting the post' });
  }
  
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',validateUserId,validateUser, async(req, res) => {
  
  const {id} = req.params;
  const updatedUser = await Users.update(id,req.body)
  res.status(201).json(updatedUser)
  
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',validateUserId, (req, res) => {
    try{
      const deleted = Users.delete(req.params.id)
      req.json(deleted)
    }catch(err){

    }
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
