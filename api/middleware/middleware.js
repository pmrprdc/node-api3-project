const Users = require('../users/users-model');



function logger(req, res, next) {
  // DO YOUR MAGIC
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
    res.status(500).json({ message: "Internal server error" }); // Handle database errors
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules


module.exports = {validatePost, validateUser, validateUserId, logger}