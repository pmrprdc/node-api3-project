const Users = require('../users/users-model');



function logger(req, res, next) {
  // DO YOUR MAGIC
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  // Continue processing the request
  next();
}

async function validateUserId (req, res, next) {
  try {
    const userId = await Users.getById(req.params.id);

    if (userId) {
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(404).json({ message: "User not found" }); // Send an error response
    }
  } catch (error) {
    res.status(404).json({ message: "Internal server error" }); // Handle database errors
  }
}

function validateUser(req, res, next) {
  try{
    const { name } = req.body;
    if(!name){
     return res.status(400).json(
        {
          message: "missing required name"
        }
      )} else{
        next();
      }
    }catch(err){
        res.status(404).json({ message: "Internal server error" }); // Handle database errors

      }
    


 
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body;
  if(!text){
   return res.status(400).json({
      message: "missing required text"
    })
  }else {
    next();
  }
}

// do not forget to expose these functions to other modules


module.exports = {validatePost, validateUser, validateUserId, logger}