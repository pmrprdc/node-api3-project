const express = require('express');

const server = express();
const router = require('./users/users-router'); // Adjust the path as needed
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here


server.use('/api/users', router);
module.exports = server;







