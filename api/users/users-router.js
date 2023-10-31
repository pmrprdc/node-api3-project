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



router.get('/',logger, async(req, res) => {
   const allUsers = await Users.get();
 return  res.status(200).json(allUsers)
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id',logger,validateUserId, async(req, res) => {
 
  const currentUser = await Users.getById(req.params.id)
 return res.status(400).json(currentUser)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/',logger, async(req, res) => {
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
    return res.status(201).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error inserting the post' });
  }
  
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',logger,validateUserId,validateUser, async(req, res) => {
  
  const {id} = req.params;
  const updatedUser = await Users.update(id,req.body)
  return res.status(201).json(updatedUser)
  
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',logger,validateUserId, async(req, res) => {
     try{
      const userToDelete = await Users.getById(req.params.id)
      const deletedId = await Users.remove(req.params.id)
      res.json(userToDelete)
     }catch(err){
      res.status(404).json({
        message: "server error"
      })
     }
      
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',logger, validateUserId, async(req, res) => {
    
    const userPosts = await Users.getUserPosts(req.params.id)
    return res.status(200).json(userPosts)

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',logger,validateUserId,validatePost, async(req, res) => {
      // const {text} = req.body;
      // if(!text){
      //  return res.status(400).json({
      //     message: "missing required text"
      //   })
      // }
    const addedReturn  = await Posts.insert({...req.body, user_id: req.params.id})
    return res.json(addedReturn)
    
ç
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;
